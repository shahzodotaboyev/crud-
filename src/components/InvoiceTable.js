import React from "react";

function InvoiceTable({ invoices, deleteInvoice, openModal }) { 
    return (
        <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2">Invoice ID</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Customer</th>
                    <th className="border p-2">Payable</th>
                    <th className="border p-2">Paid</th>
                    <th className="border p-2">Due</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((invoice, index) => (
                    <tr key={index} className="border">
                        <td className="border p-2">{invoice.id}</td>
                        <td className="border p-2">{invoice.date}</td>
                        <td className="border p-2">{invoice.customer}</td>
                        <td className="border p-2">${invoice.payable}</td>
                        <td className="border p-2">${invoice.paid}</td>
                        <td className="border p-2">${invoice.due}</td>
                        <td className="border p-2">
                            <button
                                className="bg-yellow-500 text-white px-2 py-1 mr-2"
                                onClick={() => openModal(invoice)}   
                            >
                                Edit
                            </button>

                            <button
                                className="bg-red-500 text-white px-2 py-1"
                                onClick={() => deleteInvoice(invoice.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default InvoiceTable;
