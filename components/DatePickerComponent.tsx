import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import thTH from '../utils/th_TH.ts';
import { CustomProvider } from 'rsuite';

const App = () => <DatePicker format="MM/dd/yyyy" size="md" style={{ width: 210 }}/>;

function DatePickerComponent() {
  useEffect(() => {
    ReactDOM.render(
      <CustomProvider locale={thTH}>
          <App />
      </CustomProvider>,
      document.getElementById('root')
    );
  }, []);

  return <div id="root"></div>;
}

export default DatePickerComponent;