# 🏥 Post-Discharge Monitoring System

A full-stack web application designed to remotely monitor patients after they are discharged from a hospital. It features dashboards for both patients and doctors, enabling continuous health monitoring, medicine reminders, and alerts for abnormal vital signs.

---

## 📌 Features

### 👩‍⚕️ Doctor Dashboard
- View a list of **all registered patients** with their contact details.
- Track **vitals** (e.g., heart rate, blood pressure, temperature) submitted by patients.
- **Automatic red/green color indicators**:
  - 🔴 **Red** for abnormal vitals.
  - 🟢 **Green** for normal vitals.
- Quickly identify at-risk patients and take proactive action.

### 🧑‍🦽 Patient Dashboard
- Submit **daily vitals** (heart rate, temperature, blood pressure, etc.).
- View **today’s medicine reminders** including:
  - Medicine name
  - Time to take
  - Dosage
- User-friendly interface for regular health tracking.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** + **Vite**
- **Tailwind CSS** for styling
- **Axios** for API calls

### Backend
- **Node.js** + **Express.js**
- **MongoDB** (via Mongoose) for data storage

---

## 📂 Project Structure

post-discharge-monitoring/
├── client/ # React frontend
│ ├── components/ # Reusable UI components
│ ├── pages/ # Patient and Doctor dashboards
│ └── ...
├── server/ # Node.js backend
│ ├── models/ # Mongoose models (User, Vitals, Reminders)
│ ├── routes/ # API routes
│ └── ...
└── README.md # Project documentation


---
## 📦 Installation

### 1. Clone the repo
git clone https://github.com/Vanshikakohar/post-discharge-monitoring.git
cd post-discharge-monitoring

## 🚀 Getting Started

### 1. Clone the Repository


git clone https://github.com/Vanshikakohar/post-discharge-monitoring.git
cd post-discharge-monitoring
2. Install Dependencies
Frontend
Copy
Edit
cd client
npm install
Backend
Copy
Edit
cd ../server
npm install
3. Environment Variables
Create a .env file in the server/ folder with the following:

env
Copy
Edit
MONGODB_URI=<your-mongo-db-connection>
PORT=5000
4. Run the Application
Start Backend
Copy
Edit
cd server
npm start
Start Frontend
bash
Copy
Edit
cd ../client
npm run dev
The app should be running at http://localhost:5173
📦 Future Improvements
Notification system for abnormal vitals

Patient history charting

Authentication & roles

Email alerts for doctors

🧑‍💻 Author
👩‍💻 Vanshika Kohar
🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

📝 License
This project is open-source and available under the MIT License.

yaml
Copy
Edit

---

You can:

1. Save this content as `README.md` in the root folder (`post-discharge-monitoring/`).
2. Git add, commit, and push:
   ```bash
   git add README.md
   git commit -m "Added full README"
   git push
