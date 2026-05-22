"use client";

import { useState } from "react";

export default function CertificatePage() {
  const [nid, setNid] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!nid) return alert("Enter Student ID");

    setLoading(true);

    const url = `http://localhost:5000/api/v1/certificate/${nid}`;

    // 🔥 preview show
    setPreviewUrl(url);

    setLoading(false);
  };

  const handleDownload = () => {
    if (!nid) return;

    window.open(
      `http://localhost:5000/api/v1/certificate/${nid}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">

      <h1 className="text-2xl font-bold mb-6">
        Certificate
      </h1>

      {/* INPUT */}
      <div className="bg-white p-6 rounded shadow w-96">

        <input
          type="text"
          placeholder="Enter Student NID"
          value={nid}
          onChange={(e) => setNid(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          View Certificate
        </button>

      </div>

      {/* LOADING */}
      {loading && <p className="mt-4">Loading...</p>}

      {/* PREVIEW */}
      {previewUrl && (
        <div className="mt-8 bg-white p-4 shadow rounded">

          <h2 className="text-lg font-semibold mb-3">
            Preview
          </h2>

          <img
            src={previewUrl}
            alt="Certificate"
            className="max-w-full rounded"
          />

          {/* DOWNLOAD */}
          <button
            onClick={handleDownload}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Download Certificate
          </button>

        </div>
      )}
    </div>
  );
}