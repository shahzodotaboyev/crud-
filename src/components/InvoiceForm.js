import React, { useState, useEffect } from "react";

function InvoiceForm({ invoice, addInvoice, editInvoice, closeModal }) {
  const [formData, setFormData] = useState({
    id: "",
    date: "",
    customer: "",
    payable: "",
    paid: "",
    due: "",
  });

  useEffect(() => {
    if (invoice) {
      setFormData(invoice);
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      editInvoice(formData);
    } else {
      addInvoice({ ...formData, id: Date.now().toString() });
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {formData.id ? "Edit Invoice" : "Add Invoice"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            value={formData.customer}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="number"
            name="payable"
            placeholder="Payable Amount"
            value={formData.payable}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="number"
            name="paid"
            placeholder="Paid Amount"
            value={formData.paid}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="number"
            name="due"
            placeholder="Due Amount"
            value={formData.due}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
            required
          />

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {formData.id ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceForm;
