// export default PatientDashboard;
import { useEffect, useState } from "react";
import axios from "axios";
import VitalsChart from "../components/VitalsChart";
import MedicineReminderForm from "../components/MedicineReminderForm";
import TodayReminders from "../components/TodayReminders";

function PatientDashboard() {
  const [user, setUser] = useState(null);
  const [temperature, setTemperature] = useState("");
  const [pulse, setPulse] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [vitals, setVitals] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem("token");

  const handleReminderAdded = () => setRefresh(!refresh);

  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchVitals();
      fetchAlerts();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  const fetchVitals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vitals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVitals(res.data);
    } catch (err) {
      console.error("Failed to fetch vitals:", err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alerts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const now = new Date();
      const unique = new Map();

      const upcomingAlerts = res.data.filter((a) => {
        const key = `${a.alertDate}_${a.message}`;
        if (!unique.has(key) && new Date(a.alertDate) >= now) {
          unique.set(key, true);
          return true;
        }
        return false;
      });

      setAlerts(upcomingAlerts);
    } catch (err) {
      console.error("Failed to fetch alerts:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        temperature: parseFloat(temperature),
        pulse: parseInt(pulse),
        bloodPressure,
        symptoms,
      };

      await axios.post("http://localhost:5000/api/vitals", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Vitals submitted successfully!");
      setTemperature("");
      setPulse("");
      setBloodPressure("");
      setSymptoms("");
      fetchVitals();
    } catch (err) {
      console.error("Failed to submit vitals:", err);
      alert("Failed to submit vitals");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 text-gray-800 p-6 max-w-5xl mx-auto space-y-8">
      <h2 className="text-4xl font-bold text-center text-blue-700">Patient Dashboard</h2>

      {/* User Profile */}
      {user && (
        <div className="bg-white p-6 rounded-xl shadow space-y-2">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">👤 Profile</h3>
          <p><span className="font-semibold text-gray-700">Name:</span> {user.name}</p>
          <p><span className="font-semibold text-gray-700">Email:</span> {user.email}</p>
          <p><span className="font-semibold text-gray-700">Role:</span> {user.role}</p>
        </div>
      )}

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold flex items-center mb-2">
            <span className="mr-2">⚠️</span> Upcoming Reminders
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            {alerts.map((a, i) => (
              <li key={i}>
                <strong>{new Date(a.alertDate).toLocaleDateString()}:</strong> {a.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Medicine Reminder */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="text-2xl font-semibold text-blue-600">💊 Medicine Reminders</h3>
        <MedicineReminderForm userId={user?._id} onAdded={handleReminderAdded} />
        <TodayReminders key={refresh} userId={user?._id} />
      </div>

      {/* Vitals Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <h3 className="text-2xl font-semibold text-blue-600">📝 Submit Daily Vitals</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="🌡️ Temperature (°C)"
            className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="number"
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            placeholder="❤️ Pulse (bpm)"
            className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="text"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            placeholder="🩸 Blood Pressure"
            className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            required
          />
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="🤒 Symptoms"
            className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {/* Vitals History */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="text-2xl font-semibold text-blue-600">📊 Vitals History</h3>
        {vitals.length === 0 ? (
          <p className="text-gray-500">No vitals submitted yet.</p>
        ) : (
          <ul className="space-y-3">
            {vitals.map((v, index) => (
              <li
                key={index}
                className="border p-4 rounded-lg bg-gray-50 shadow-sm"
              >
                <p><strong>Date:</strong> {new Date(v.createdAt).toLocaleString()}</p>
                <p><strong>Temp:</strong> {v.temperature} °C</p>
                <p><strong>Pulse:</strong> {v.pulse} bpm</p>
                <p><strong>BP:</strong> {v.bloodPressure}</p>
                <p><strong>Symptoms:</strong> {v.symptoms}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chart */}
      <VitalsChart vitals={vitals} />

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default PatientDashboard;

