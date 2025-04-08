# 🌎 Cloud-Based Eco Tracker

A modern web application that allows users to calculate their carbon footprint, view emissions reports, ask sustainability questions, and log personal eco goals — powered by a cloud-native backend using AWS Lambda, API Gateway, and DynamoDB.

---

## 🔧 Tech Stack

### 🖥️ Frontend
- **React** (via Create React App)
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- Hosted locally (can be deployed to Netlify, Vercel, or S3)

### ☁️ Backend (Cloud-Native)
- **AWS Lambda** for serverless compute
- **API Gateway** to expose RESTful endpoints
- **(Optional) DynamoDB** for persistent goal storage
- **CORS** configured for secure frontend/backend communication

---

## 🚀 Features

- ✅ **Carbon Calculator**: Estimate CO₂ emissions based on energy and fuel usage.
- 📊 **Emissions Report**: View monthly/yearly summaries and breakdowns by category.
- 🤖 **Chatbot**: Ask sustainability-related questions (basic template).
- 📌 **Log Goals**: Add personal sustainability goals that are saved via AWS Lambda and API Gateway.

---

## 🛠️ Setup Instructions

### 1. Clone & Install Frontend

```bash
git clone https://github.com/your-username/eco-tracker.git
cd carbon-footprint-system
npm install
npm start
