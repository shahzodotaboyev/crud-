import React, { useState } from "react";
import {
  useFetchInvoices,
  useAddInvoice,
  useDeleteInvoice,
  useEditInvoice,
} from "./service/api";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceForm from "./components/InvoiceForm";
import "./styles.css";

function App() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: invoices = [], isLoading, error } = useFetchInvoices();
  const addInvoiceMutation = useAddInvoice();
  const deleteInvoiceMutation = useDeleteInvoice();
  const editInvoiceMutation = useEditInvoice();

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addInvoice = (invoice) => {
    addInvoiceMutation.mutate({
      ...invoice,
      id: invoices.length ? invoices[invoices.length - 1].id + 1 : 1,
    });
  };

  const deleteInvoice = (id) => {
    deleteInvoiceMutation.mutate(id);
  };

  const editInvoice = (updatedInvoice) => {
    editInvoiceMutation.mutate(updatedInvoice);
    setSelectedInvoice(null);
    document.body.style.overflow = "auto";
  };

  const openModal = (invoice) => {
    setSelectedInvoice({ ...invoice, id: invoice.id || null });
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedInvoice(null);
    document.body.style.overflow = "auto";
  };

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (error) return <div>Xatolik yuz berdi!</div>;

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
