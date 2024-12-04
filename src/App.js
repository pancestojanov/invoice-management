import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InvoiceListing from './InvoiceListing';
import InvoiceCreate from './InvoiceCreate';
import InvoiceEdit from './InvoiceEdit';

function App() {
  return (
    <div className="App">
      <h1>Invoice Management</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InvoiceListing />}></Route>
          <Route path='/invoice/create' element={<InvoiceCreate />}></Route>
          <Route path='/employee/edit/:invid' element={<InvoiceEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
