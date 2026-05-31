# 🤖 BuddyAI

An AI-powered chat application built with the MERN stack that enables users to interact with multiple AI models, generate images, and manage usage through a credit-based payment system powered by Razorpay.

---

## 🚀 Live Demo

🔗 Add your deployed application link here

```text
https://buddyai-flame.vercel.app
```

---

## 📖 About The Project

BuddyAI is a full-stack AI application designed to provide users with a seamless conversational AI experience. Users can chat with AI, generate images from text prompts, manage chat history, and purchase credits securely through Razorpay.

The application integrates modern AI APIs and follows a scalable architecture with secure authentication, payment processing, and cloud-based image management.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User Registration & Login
* JWT-based Authentication
* Protected Routes
* Secure API Access

### 💬 AI Chat

* Real-time AI Conversations
* Multiple AI Model Support
* Persistent Chat History
* Create and Delete Chats
* Context-Aware Responses

### 🎨 AI Image Generation

* Generate Images from Text Prompts
* Image Storage and Retrieval
* ImageKit Cloud Integration

### 💳 Credit System

* Credit-Based Usage Tracking
* Automatic Credit Deduction
* Credit Balance Management
* Purchase Additional Credits Anytime

### 💰 Razorpay Payment Integration

* Secure Online Payments
* Credit Purchase Workflow
* Backend Payment Verification
* Transaction Handling

### 🌙 Modern User Interface

* Responsive Design
* Dark & Light Theme Support
* Smooth User Experience
* Mobile-Friendly Layout

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast
* Moment.js

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT

### AI Services

* Gemini API
* Groq API

### Payment Gateway

* Razorpay

### Cloud Services

* ImageKit

---

## 📂 Project Structure

```bash
BuddyAI
│
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server
│   ├── configs
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── screenshots
│   ├── login.png
│   ├── chat.png
│   ├── plans.png
│   └── payment.png
│
└── README.md
```

---

## 📸 Screenshots

### 🔐 Authentication

![Login Page](./screenshots/login.png)

### 💬 AI Chat Interface

![Chat Interface](./screenshots/chat.png)

### 💳 Credit Plans

![Credit Plans](./screenshots/plans.png)

### 💰 Razorpay Payment

![Payment Gateway](./screenshots/payment.png)

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_openai_api_key

GROQ_API_KEY=your_groq_api_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

RAZORPAY_TEST_API_KEY=your_razorpay_key_id
RAZORPAY_TEST_SECRET_KEY=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

### Frontend (.env)

```env
VITE_SERVER_URL=http://localhost:3000

VITE_RAZORPAY_TEST_API_KEY=your_razorpay_key_id
```

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/vinothkumarS1710/BuddyAI.git

cd BuddyAI
```

### 2. Install Frontend Dependencies

```bash
cd client

npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server

npm install
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd server

npm run server
```

### Start Frontend

```bash
cd client

npm run dev
```

Application URLs:

```text
Frontend: http://localhost:5173

Backend: http://localhost:3000
```

---

## 💳 Credit Plans

| Plan     | Credits      | Price |
| -------- | ------------ | ----- |
| Basic    | 100 Credits  | ₹29   |
| Standard | 500 Credits  | ₹99   |
| Premium  | 1000 Credits | ₹199  |

> Update the pricing according to your latest plans.

---

## 🔒 Security Features

* JWT Authentication
* Password Hashing
* Protected Routes
* Payment Verification
* Secure Environment Variables
* API Error Handling
* Rate Limiting

---

## 🌟 Key Highlights

* Full-Stack MERN Application
* AI Chat Integration
* AI Image Generation
* Razorpay Payment Gateway
* Credit-Based Monetization System
* Responsive UI Design
* Secure Authentication Workflow

---

## 🎯 Future Enhancements

* Voice-Based AI Assistant
* File Upload & Analysis
* AI PDF Summarization
* AI Code Generation
* Subscription-Based Plans
* Chat Sharing
* Team Collaboration Features

---

## 👨‍💻 Author

### Vinoth Kumar S

Full Stack Developer | MERN Stack Enthusiast | AI Application Developer

#### Connect With Me

* LinkedIn: https://www.linkedin.com/in/vinoth-fullstack
* GitHub: https://github.com/vinothkumarS1710

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates further development.

---

## 📜 License

This project is licensed under the MIT License.
