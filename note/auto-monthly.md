Creating a system to track whether tenants have paid their monthly bills involves several steps. Here's a high-level overview of how you can implement this:

---

### **1. Database Design**
You need to design your database schema to store information about tenants, bills, and payments.

#### Example Tables:
1. **Tenants Table**:
   - Stores tenant information.
   ```sql
   CREATE TABLE Tenants (
       id INT AUTO_INCREMENT PRIMARY KEY,
       clerk_id VARCHAR(255) NOT NULL,
       first_name VARCHAR(100) NOT NULL,
       last_name VARCHAR(100) NOT NULL,
       email VARCHAR(255) NOT NULL,
       apartment_id INT,
       room_number VARCHAR(50),
       FOREIGN KEY (apartment_id) REFERENCES Apartments(id)
   );
   ```

2. **Bills Table**:
   - Stores monthly bills for each tenant.
   ```sql
   CREATE TABLE Bills (
       id INT AUTO_INCREMENT PRIMARY KEY,
       tenant_id INT NOT NULL,
       amount DECIMAL(10, 2) NOT NULL,
       due_date DATE NOT NULL,
       paid BOOLEAN DEFAULT FALSE,
       payment_date DATE,
       FOREIGN KEY (tenant_id) REFERENCES Tenants(id)
   );
   ```

3. **Payments Table** (Optional):
   - Stores payment details if you want to track payment history.
   ```sql
   CREATE TABLE Payments (
       id INT AUTO_INCREMENT PRIMARY KEY,
       bill_id INT NOT NULL,
       payment_date DATE NOT NULL,
       amount DECIMAL(10, 2) NOT NULL,
       FOREIGN KEY (bill_id) REFERENCES Bills(id)
   );
   ```

---

### **2. Generate Monthly Bills**
At the start of each month, generate bills for all tenants.

#### Example Code:
```javascript
async function generateMonthlyBills() {
  const connection = await getConnection();

  try {
    // Get all tenants
    const [tenants] = await connection.execute('SELECT id FROM Tenants');

    // Generate a bill for each tenant
    for (const tenant of tenants) {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + 1); // Due next month

      await connection.execute(
        `INSERT INTO Bills (tenant_id, amount, due_date) VALUES (?, ?, ?)`,
        [tenant.id, 1000.00, dueDate] // Example: $1000 monthly rent
      );
    }

    console.log('Monthly bills generated successfully');
  } catch (error) {
    console.error('Error generating monthly bills:', error);
  } finally {
    await connection.end();
  }
}

// Call this function at the start of each month
generateMonthlyBills();
```

---

### **3. Track Payments**
When a tenant pays their bill, update the `Bills` table to mark the bill as paid and record the payment date.

#### Example Code:
```javascript
async function recordPayment(tenantId, billId, amount) {
  const connection = await getConnection();

  try {
    // Update the bill as paid
    await connection.execute(
      `UPDATE Bills SET paid = TRUE, payment_date = NOW() WHERE id = ? AND tenant_id = ?`,
      [billId, tenantId]
    );

    // Optionally, record the payment in the Payments table
    await connection.execute(
      `INSERT INTO Payments (bill_id, payment_date, amount) VALUES (?, NOW(), ?)`,
      [billId, amount]
    );

    console.log('Payment recorded successfully');
  } catch (error) {
    console.error('Error recording payment:', error);
  } finally {
    await connection.end();
  }
}
```

---

### **4. Display Payment Status**
Create an API endpoint or a dashboard to display whether tenants have paid their bills.

#### Example API Endpoint:
```javascript
router.get('/tenant-payment-status/:tenantId', async (req, res) => {
  const { tenantId } = req.params;

  let connection;
  try {
    connection = await getConnection();

    // Get all bills for the tenant
    const [bills] = await connection.execute(
      `SELECT id, amount, due_date, paid, payment_date FROM Bills WHERE tenant_id = ?`,
      [tenantId]
    );

    res.status(200).json(bills);
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({ error: 'Error fetching payment status' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});
```

---

### **5. Notify Tenants**
Send reminders to tenants who haven't paid their bills by the due date.

#### Example Code:
```javascript
async function sendPaymentReminders() {
  const connection = await getConnection();

  try {
    // Get unpaid bills
    const [unpaidBills] = await connection.execute(
      `SELECT t.email, b.due_date 
       FROM Bills b
       JOIN Tenants t ON b.tenant_id = t.id
       WHERE b.paid = FALSE AND b.due_date < NOW()`
    );

    // Send reminders
    for (const bill of unpaidBills) {
      const email = bill.email;
      const dueDate = bill.due_date;

      // Send email (use a library like nodemailer)
      console.log(`Sending reminder to ${email} for bill due on ${dueDate}`);
    }

    console.log('Payment reminders sent successfully');
  } catch (error) {
    console.error('Error sending payment reminders:', error);
  } finally {
    await connection.end();
  }
}

// Call this function daily or weekly
sendPaymentReminders();
```

---

### **6. Frontend Display**
Create a frontend interface to display the payment status for tenants.

#### Example React Component:
```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TenantPaymentStatus({ tenantId }) {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get(`/api/tenant-payment-status/${tenantId}`)
      .then(response => setBills(response.data))
      .catch(error => console.error('Error fetching payment status:', error));
  }, [tenantId]);

  return (
    <div>
      <h2>Payment Status</h2>
      <table>
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>${bill.amount}</td>
              <td>{new Date(bill.due_date).toLocaleDateString()}</td>
              <td>{bill.paid ? 'Paid' : 'Unpaid'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TenantPaymentStatus;
```

---

### **7. Automate Monthly Processes**
Use a task scheduler (e.g., `cron` in Node.js) to automate monthly bill generation and payment reminders.

#### Example with `node-cron`:
```javascript
import cron from 'node-cron';

// Generate bills on the 1st of every month
cron.schedule('0 0 1 * *', () => {
  generateMonthlyBills();
});

// Send payment reminders every Monday
cron.schedule('0 0 * * 1', () => {
  sendPaymentReminders();
});
```

---

### **Summary**
1. **Database Design**:
   - Create tables for tenants, bills, and payments.
2. **Generate Bills**:
   - Automate monthly bill generation.
3. **Track Payments**:
   - Update bills when tenants pay.
4. **Display Status**:
   - Create an API and frontend to display payment status.
5. **Send Reminders**:
   - Notify tenants about unpaid bills.
6. **Automate**:
   - Use a task scheduler to automate monthly processes.

---

Let me know if you need further assistance!