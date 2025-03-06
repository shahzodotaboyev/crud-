import React, { useEffect, useState } from "react";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceForm from "./components/InvoiceForm";

const API_URL = "http://localhost:5000/invoices";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setInvoices(data);
        setFilteredInvoices(data);
      })
      .catch(err => console.error("Xato:", err));
  }, []);

  useEffect(() => {
    setFilteredInvoices(
      invoices.filter((invoice) =>
        invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, invoices]);

  const addInvoice = (invoice) => {
    const newInvoice = { 
      ...invoice, 
      id: invoices.length ? invoices[invoices.length - 1].id + 1 : 1 
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInvoice),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedInvoices = [...invoices, data];
        setInvoices(updatedInvoices);
        setFilteredInvoices(updatedInvoices);
      })
      .catch((error) => console.error("Error adding invoice:", error));
  };

  const deleteInvoice = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        const updatedInvoices = invoices.filter((inv) => inv.id !== id);
        setInvoices(updatedInvoices);
        setFilteredInvoices(updatedInvoices);
      })
      .catch((error) => console.error("Error deleting invoice:", error));
  };

  const editInvoice = (updatedInvoice) => {
    fetch(`${API_URL}/${updatedInvoice.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInvoice),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedInvoices = invoices.map((inv) => (inv.id === data.id ? data : inv));
        setInvoices(updatedInvoices);
        setFilteredInvoices(updatedInvoices);
        setSelectedInvoice(null);
        document.body.style.overflow = "auto";
      })
      .catch((error) => console.error("Error updating invoice:", error));
  };

  const openModal = (invoice) => {
    setSelectedInvoice({ ...invoice, id: invoice.id || null });
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedInvoice(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Management</h1>

      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() =>
            openModal({
              id: "",
              date: "",
              customer: "",
              payable: "",
              paid: "",
              due: "",
            })
          }
        >
          Add Invoice
        </button>
        <input
          type="text"
          placeholder="Search Customer..."
          className="border p-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {selectedInvoice && (
        <InvoiceForm 
          invoice={selectedInvoice} 
          addInvoice={addInvoice} 
          editInvoice={editInvoice} 
          closeModal={closeModal} 
        />
      )}

      <InvoiceTable
        invoices={filteredInvoices}
        deleteInvoice={deleteInvoice}
        openModal={openModal}
      />
    </div>
  );
}

export default App;
