"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default function PaymentPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);

  const email = localStorage.getItem("userEmail"); // 🔥 IMPORTANT

  useEffect(() => {
    if (!email) return;

    fetchAdmissions();
  }, [email]);

  const fetchAdmissions = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/v1/admissions/my-admissions?email=${email}`,
    );

    setAdmissions(res.data.data);
  };

  /* 🔥 PAY NOW */
  const handlePay = async (admissionId: string, amount: number) => {

  const email = localStorage.getItem("userEmail");

  const res = await axios.post(
    "http://localhost:5000/api/v1/payment/init",
    {
      admissionId,
      amount,
      email,
    }
  );

  window.location.assign(res.data.url);
};

  /* 🔥 PDF */
  const generatePDF = (admission: any, payment: any) => {
    const doc = new jsPDF();

    doc.text("Payment Invoice", 20, 20);
    doc.text(`Name: ${admission.fullName}`, 20, 40);
    doc.text(`Email: ${admission.email}`, 20, 55);
    doc.text(`Amount: ${payment.amount}`, 20, 70);
    doc.text(`Transaction ID: ${payment.transactionId}`, 20, 85);
    doc.text(`Date: ${new Date(payment.date).toLocaleDateString()}`, 20, 100);

    doc.save("invoice.pdf");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Payments</h1>

      {admissions.length === 0 && <p>No data found</p>}

      {admissions.map((a) => (
        <div key={a._id} className="bg-white p-4 mb-4 shadow rounded">
          <h2 className="font-bold">{a.fullName}</h2>

          <p>Status: {a.feeStatus}</p>
          <p>Total Paid: ৳{a.feeAmount}</p>

          {/* 🔥 PAY NOW */}
          {a.feeStatus === "unpaid" && (
            <button
              onClick={() => handlePay(a._id, 5000)}
              className="bg-green-600 text-white px-3 py-1 mt-2"
            >
              Pay Now
            </button>
          )}

          {/* 🔥 PAYMENT HISTORY */}
          {a.payments?.map((p: any, i: number) => (
            <div key={i} className="mt-3 border-t pt-2">
              <p>Amount: ৳{p.amount}</p>
              <p>Txn: {p.transactionId}</p>
              <p>Date: {new Date(p.date).toLocaleDateString()}</p>

              <button
                onClick={() => generatePDF(a, p)}
                className="bg-blue-500 text-white px-2 py-1 mt-2"
              >
                Print PDF
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
