import { useEffect, useState } from "react";
import axios from "axios";

function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllVitals();
  }, []);

  const fetchAllVitals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vitals/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data);
    } catch (err) {
      console.error("Failed to fetch vitals:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-gray-800 p-6 max-w-6xl mx-auto font-inter">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-8 border-b pb-2">
        <h1 className="text-3xl font-bold text-blue-700">Doctor Dashboard</h1>
        <div className="space-x-4">
          <a href="/patient" className="text-blue-600 hover:underline">Patient</a>
          <a href="/doctor" className="text-blue-600 hover:underline">Doctor</a>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      {patients.length === 0 ? (
        <p className="text-center text-gray-500">No vitals data found.</p>
      ) : (
        patients.map((entry, index) => {
          const isAbnormal = entry.vitals.some(
            (v) => v.temperature > 100 || v.pulse > 100
          );

          const bgColor =
            entry.vitals.length === 0
              ? "bg-gray-100"
              : isAbnormal
              ? "bg-red-50"
              : "bg-green-50";

          const borderColor =
            entry.vitals.length === 0
              ? "border-gray-300"
              : isAbnormal
              ? "border-red-500"
              : "border-green-500";

          return (
            <div
              key={index}
              className={`p-5 rounded-xl shadow-md border-l-8 ${bgColor} ${borderColor} mb-6`}
            >
              <h3 className="text-xl font-semibold text-purple-800">
                👤 {entry.user?.name || "Unnamed"}{" "}
                <span className="text-sm text-gray-600">({entry.user?.email})</span>
              </h3>

              {entry.vitals.length === 0 ? (
                <p className="text-gray-500 italic mt-2">No vitals submitted</p>
              ) : (
                entry.vitals.map((v, i) => (
                  <div
                    key={i}
                    className="border-t pt-2 mt-2 space-y-1 text-sm text-gray-700"
                  >
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(v.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Temp:</strong> {v.temperature} °C
                    </p>
                    <p>
                      <strong>Pulse:</strong> {v.pulse} bpm
                    </p>
                    <p>
                      <strong>BP:</strong> {v.bloodPressure}
                    </p>
                    <p>
                      <strong>Symptoms:</strong> {v.symptoms}
                    </p>
                    {(v.temperature > 100 || v.pulse > 100) && (
                      <p className="text-red-600 font-semibold">
                        ⚠️ Abnormal vitals detected!
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default DoctorDashboard;
