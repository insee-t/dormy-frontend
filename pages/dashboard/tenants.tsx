import { useState, useEffect } from "react";
import App from "../../components/Sidebar/App";
import { fetchTenants } from "../../pages/api/tenantApi";
import TenantForm from "../../components/TenantForm";
import { useSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3001/api";

// Define Tenant type
interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  apartment: string;
  status: "pending" | "active";
}

// Mock tenant data (replace with Clerk API calls later)
// const mockTenants: Tenant[] = [
//     { id: "1", firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", apartment: "3B", status: "pending" },
//     { id: "2", firstName: "John", lastName: "Smith", email: "john.smith@example.com", apartment: "5A", status: "active" },
// ];

// Form data type
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  apartment: string;
}

interface Apartment {
  apartment_id: number;
  apartment_name: string;
  apartment_address: string;
  is_default: boolean;
}

const TenantsPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [tenants, setTenants] = useState<Tenant[]>([]); // Tenant list
  const [showForm, setShowForm] = useState<boolean>(false); // Toggle form visibility
  const [defaultApartmentId, setDefaultApartmentId] = useState<number | null>(
    null,
  );
  //const [formData, setFormData] = useState<FormData>({
  //    firstName: "",
  //    lastName: "",
  //    email: "",
  //    apartment: "",
  //});
  const [selectedApartmentId, setSelectedApartmentId] = useState<number | null>(
    null,
  );
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if user is admin (simplified; use Clerk roles in production)
  /* const isAdmin = user?.publicMetadata?.role === "admin"; */

  // Fetch tenants (placeholder for Clerk API)
  useEffect(() => {
    // Replace with clerk.users.getUserList() in production
    // setTenants(mockTenants);
    fetchTenants();

    const fetchApartments = async () => {
      try {
        const [apartmentsRes, tenantsRes, defaultRes] = await Promise.all([
          fetch(`${API_BASE_URL}/apartments/my-apartments`, {
            credentials: "include",
          }),
          fetch(`${API_BASE_URL}/tenants/get-tenants`, {
            credentials: "include",
          }),
          fetch(`${API_BASE_URL}/apartments/default-apartment`, {
            credentials: "include",
          }),
        ]);

        if (!apartmentsRes.ok || !tenantsRes.ok || !defaultRes.ok) {
          throw new Error("One or more network responses were not ok");
        }

        const apartmentsData = await apartmentsRes.json();
        const tenantsData = await tenantsRes.json();
        const defaultData = await defaultRes.json();

        setApartments(apartmentsData);
        setTenants(tenantsData);
        setDefaultApartmentId(defaultData.default_apartment_id);

        if (apartmentsData.length > 0) {
          setSelectedApartmentId(
            defaultData.default_apartment_id || apartmentsData[0].apartment_id,
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") fetchApartments();
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center">loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center text-red-500">
          Please login to view this page.
        </div>
      </div>
    );
  }

  // Handle adding a tenant
  //const handleAddTenant = async (e: React.FormEvent<HTMLFormElement>) => {
  //    e.preventDefault();
  //    try {
  //        const response = await fetch("/api/tenants/add", {
  //            method: "POST",
  //            headers: {
  //                "Content-Type": "application/json",
  //            },
  //            body: JSON.stringify(formData),
  //        });
  //
  //        if (!response.ok) {
  //            throw new Error("Failed to add tenant");
  //        }
  //
  //        const { user: newUser } = await response.json();
  //
  //        setTenants((prev) => [
  //            ...prev,
  //            {
  //                id: newUser.id,
  //                name: formData.name,
  //                email: formData.email,
  //                apartment: formData.apartment,
  //                status: "pending",
  //            },
  //        ]);
  //        setFormData({ name: "", email: "", apartment: "" });
  //        setShowForm(false);
  //        alert("Tenant added and invitation sent!");
  //    } catch (err) {
  //        console.error(err);
  //        alert("Error adding tenant: " + (err as Error).message);
  //    }
  //};

  // Restrict access to admins
  /* if (!isAdmin) {
   *   return <div className="p-4 text-red-500">You do not have permission to view this page.</div>;
   * } */

  return (
    <App title="ผู้เช่า">
      <select
        value={selectedApartmentId || ""}
        onChange={(e) => setSelectedApartmentId(Number(e.target.value))}
        className="p-2 border rounded-lg w-64"
      >
        {apartments.map((apartment) => (
          <option key={apartment.apartment_id} value={apartment.apartment_id}>
            {apartment.apartment_name}
          </option>
        ))}
      </select>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Tenants</h1>

        {/* Tenant List */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Room Number
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-gray-800">
                    {tenant.firstName} {tenant.lastName}
                  </td>
                  <td className="p-3 text-gray-800">{tenant.email}</td>
                  <td className="p-3 text-gray-800">{tenant.apartment}</td>
                  <td className="p-3 text-gray-800">{tenant.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Tenant Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {showForm ? "Cancel" : "+ Add Tenant"}
        </button>

        {/* Add Tenant Form */}
        {showForm && <TenantForm apartmentId={selectedApartmentId} />}
      </div>
    </App>
  );
};

// Server-side protection with Clerk
/* export async function getServerSideProps(context: any) {
 *   const { userId } = context.auth || {}; // Clerk’s auth helper
 *   if (!userId) {
 *     return { redirect: { destination: "/sign-in", permanent: false } };
 *   }
 *   return { props: {} };
 * } */

export default TenantsPage;
