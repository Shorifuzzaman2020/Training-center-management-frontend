

"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Award, Download, Search, FileText, RefreshCw } from "lucide-react";

export default function CertificatePage() {
  const [nid, setNid] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nid) {
      toast.error("Please enter Student NID");
      return;
    }

    setLoading(true);
    setPreviewUrl(""); 

    try {
      
      const res = await axios.get(`http://localhost:5000/api/v1/certificate/verify/${nid}`);

      
      if (res.data.success && res.data.isPassed) {
        const url = `http://localhost:5000/api/v1/certificate/${nid}`;
        setPreviewUrl(url);
        toast.success("Certificate generated successfully!");
      } else {
        toast.error(res.data.message || "You are not eligible for a certificate.");
      }
    } catch (error: any) {
      
     
      const backendMessage = error.response?.data?.message;
      
     
      const errMsg = backendMessage || "Student did not pass the final exam or NID is incorrect.";
      
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!nid) return;
    window.open(`http://localhost:5000/api/v1/certificate/${nid}`, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white shadow-sm rounded-2xl border border-gray-100 mt-6">
      
      {/* HEADER */}
      <div className="flex items-center space-x-3 border-b border-gray-100 pb-5 mb-6">
        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Certificates</h1>
          <p className="text-sm text-gray-500 mt-0.5">Enter your National ID to claim certificate</p>
        </div>
      </div>

      {/* INPUT FORM BLOCK */}
      <div className="max-w-md mx-auto bg-gray-50/50 border border-gray-100 p-6 rounded-2xl shadow-sm text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Certificate Lookup</h2>
        
        <div className="relative flex items-center mb-4">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Enter Student NID"
            value={nid}
            onChange={(e) => setNid(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Verifying Marks...</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              <span>View Certificate</span>
            </>
          )}
        </button>
      </div>

      {/* ================= PREVIEW SECTION ================= */}
      {previewUrl && (
        <div className="border border-gray-100 rounded-xl p-6 bg-gray-50/30 shadow-sm max-w-2xl mx-auto flex flex-col items-center animate-fadeIn">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 self-start">Document Preview</h3>
          
          <div className="w-full border border-gray-200 bg-white p-2 rounded-xl shadow-inner max-h-[400px] overflow-hidden flex items-center justify-center">
            <img
              src={previewUrl}
              alt="Certificate"
              className="max-w-full h-auto object-contain rounded"
            />
          </div>

          <button
            onClick={handleDownload}
            className="mt-6 inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Certificate</span>
          </button>
        </div>
      )}

    </div>
  );
}