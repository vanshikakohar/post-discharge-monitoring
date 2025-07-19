import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function VitalsChart({ vitals }) {
  const formattedData = vitals.map((v) => ({
    date: new Date(v.createdAt).toLocaleDateString(),
    temperature: v.temperature,
    pulse: v.pulse,
  })).reverse(); // latest first

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-600">Vitals Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#1d4ed8" name="Temperature (°C)" />
          <Line type="monotone" dataKey="pulse" stroke="#10b981" name="Pulse (bpm)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VitalsChart;
