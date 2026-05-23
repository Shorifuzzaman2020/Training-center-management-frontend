"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function FinancePage() {
  const [data, setData] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/finance");

    setData(res.data.data);
  };

  const addExpense = async () => {
    await axios.post("http://localhost:5000/api/v1/finance/expense", {
      title,
      amount: Number(amount),
      category: "others",
    });

    setTitle("");
    setAmount("");

    fetchData();
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Revenue & Expenses
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-green-500 text-white p-4 rounded">
          Income: ৳{data.totalIncome}
        </div>

        <div className="bg-red-500 text-white p-4 rounded">
          Expense: ৳{data.totalExpense}
        </div>

        <div className="bg-blue-500 text-white p-4 rounded">
          Balance: ৳{data.balance}
        </div>

      </div>

      {/* ADD EXPENSE */}
      <div className="bg-white p-4 mb-6 shadow rounded">

        <h2 className="font-bold mb-3">Add Expense</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mr-2"
        />

        <button
          onClick={addExpense}
          className="bg-blue-600 text-white px-3 py-2"
        >
          Add
        </button>

      </div>

      {/* EXPENSE LIST */}
      <div className="bg-white p-4 shadow rounded">

        <h2 className="font-bold mb-3">Expense History</h2>

        {data.expenses.map((e: any) => (
          <div key={e._id} className="border-b py-2">

            <p>{e.title}</p>
            <p>৳{e.amount}</p>
            <p>{new Date(e.date).toLocaleDateString()}</p>

          </div>
        ))}

      </div>

    </div>
  );
}