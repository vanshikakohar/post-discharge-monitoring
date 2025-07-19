import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TodayReminders({ userId }) {
const [reminders, setReminders] = useState([]);

const fetchReminders = async () => {
try {
const res = await axios.get(`http://localhost:5000/api/medicine/today/${userId}`);

setReminders(res.data);
} catch (err) {
console.error('Failed to fetch reminders:', err);
}
};

useEffect(() => {
fetchReminders();
}, []);

return (
<div className="mt-6 bg-white p-4 rounded-xl shadow-md w-full max-w-md">
<h2 className="text-xl font-bold mb-2">Today's Reminders</h2>
{reminders.length === 0 ? (
<p>No reminders for today.</p>
) : (
<ul className="space-y-2">
{reminders.map((reminder) => (
<li key={reminder._id} className="border p-2 rounded">
💊 <strong>{reminder.name}</strong> at <em>{reminder.time}</em> – {reminder.dose}
</li>
))}
</ul>
)}
</div>
);
}