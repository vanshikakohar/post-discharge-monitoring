import React, { useState } from 'react';
import axios from 'axios';

export default function MedicineReminderForm({ userId, onAdded }) {
const [name, setName] = useState('');
const [dose, setDose] = useState('');
const [time, setTime] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();
const date = new Date(); // today’s date
try {
await axios.post('http://localhost:5000/api/medicine', {
userId,
name,
dose,
time,
date,
});
setName('');
setDose('');
setTime('');
onAdded(); // refresh list
} catch (err) {
console.error('Failed to add reminder:', err);
}
};

return (
<form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow-md w-full max-w-md">
<h2 className="text-xl font-bold">Add Medicine Reminder</h2>
<input
type="text"
placeholder="Medicine Name"
value={name}
onChange={(e) => setName(e.target.value)}
required
className="w-full p-2 border rounded"
/>
<input
type="text"
placeholder="Dose"
value={dose}
onChange={(e) => setDose(e.target.value)}
required
className="w-full p-2 border rounded"
/>
<input
type="time"
value={time}
onChange={(e) => setTime(e.target.value)}
required
className="w-full p-2 border rounded"
/>
<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
Add Reminder
</button>
</form>
);
}