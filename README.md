# 📝 Branded Survey Builder – MERN Survey Platform

A full-stack survey management platform built using the MERN stack (**MongoDB, Express.js, React.js, Node.js**).

Branded Survey Builder allows authenticated users to create, customize, publish, and manage surveys with their own branding. Users can generate public links, collect responses, and manage all survey data through an interactive dashboard.

---

# 🚀 Overview

Branded Survey Builder provides:

* Secure JWT-based authentication
* Survey creation and customization
* Branding support using colors and logos
* Public survey sharing
* Response collection and management
* Protected frontend routes
* Interactive dashboard

The project follows a scalable layered architecture with controllers, services, middleware, routes, and models.

---

# 🧱 Project Structure

## Backend Structure

```bash
backend
│
├── src
│   ├── config              # MongoDB configuration
│   ├── controller          # Request handling logic
│   ├── middleware          # Authentication middleware
│   ├── models              # MongoDB schemas
│   ├── routes              # API routes
│   ├── services            # Business logic layer
│
├── server.js
└── package.json
```

---

## Frontend Structure

```bash
frontend
│
├── public
│
├── src
│   ├── api                 # Axios configuration
│   ├── assets              # Images
│   ├── components          # Reusable components
│   ├── context             # Authentication context
│   ├── pages               # Application pages
│   ├── routes              # Protected routes
│   ├── styles              # CSS files
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

---

# 🔐 Authentication & Authorization

## 🔒 Authentication Features

* JWT-based authentication
* User registration
* User login
* Protected routes
* Persistent user sessions

---

# ✨ Features

## 👤 User Management

* User registration
* User login
* JWT authentication
* Protected dashboard access

---

## 📋 Survey Management

Users can:

* Create surveys
* Edit surveys
* Delete surveys
* Publish surveys
* Generate public survey links

Survey details include:

* Survey title
* Survey description
* Publish status
* Creation date
* Response count

---

## 🎨 Branding

Users can customize surveys using:

* Theme color
* Logo URL

Branding automatically appears on the public survey page.

---

## ❓ Question Builder

Supported question types:

* Text questions
* Multiple-choice questions
* Rating questions

Additional functionalities:

* Add questions
* Delete questions
* Move questions up
* Move questions down
* Mark questions as required
* Add custom options

---

## 🌐 Public Surveys

Anyone with the generated URL can:

* Access surveys without logging in
* View branding
* Answer questions
* Submit responses

---

## 📊 Response Management

Survey owners can:

* View total responses
* View individual responses
* See questions and answers
* Navigate back to dashboard

---

## 🖥️ Frontend Pages

* Login Page
* Register Page
* Dashboard
* Survey Builder Page
* Public Survey Page
* Responses Page

---

# ⚙️ Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Context API
* CSS

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

# 📡 API Modules

## 🔑 Authentication

Features:

* Register user
* Login user
* JWT token generation

---

## 📋 Surveys

Features:

* Create survey
* Update survey
* Delete survey
* Publish survey
* Generate public URL
* Get user surveys

---

## ❓ Questions

Features:

* Add questions
* Update questions
* Delete questions
* Reorder questions

---

## 📊 Responses

Features:

* Submit responses
* Get all responses
* View individual responses

---

# 🗄️ Database Models

## User

Fields:

* name
* email
* password

---

## Survey

Fields:

* userId
* title
* description
* themeColor
* logoUrl
* published

---

## Question

Fields:

* surveyId
* questionText
* type
* options
* required
* order

---

## Response

Fields:

* surveyId
* answers
* timestamps

---

# 📈 Application Flow

1. User registers.
2. User logs in.
3. User accesses the dashboard.
4. User creates a survey.
5. User adds branding.
6. User adds questions.
7. User saves the survey.
8. User publishes the survey.
9. Public URL is generated.
10. Respondents fill the survey.
11. Responses are stored in MongoDB.
12. Survey owner views responses.

---

# 🔐 Protected Frontend Routing

Routes are protected using:

* JWT authentication
* AuthContext
* Protected routes

---

# ▶️ How to Run

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

---

## 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 4️⃣ Configure Environment Variables

Create a `.env` file inside backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 5️⃣ Run Backend

```bash
npm run dev
```

---

## 6️⃣ Run Frontend

```bash
npm run dev
```

---

# 🤖 AI Usage Declaration

AI tools such as ChatGPT were used for:

* UI improvement ideas
* CSS suggestions
* Code structuring guidance
* Debugging assistance

All code was reviewed, understood, and integrated manually before use.

---

# 🛠️ Future Enhancements

* Analytics dashboard
* Graphs and charts
* CSV export
* PDF export
* Logo upload instead of URL
* Conditional questions
* Survey templates
* Search and filter functionality
* Dark mode

---

# 📝 Notes

* Built using MERN stack architecture
* Layered backend architecture
* RESTful APIs
* JWT-secured authentication
* Responsive frontend design
* Designed for scalability and maintainability

---

# 🎯 Objective

The goal of this project is to build a user-friendly survey platform that allows users to create branded surveys, distribute them publicly, and analyze responses efficiently.

---

# 👨‍💻 Author

Developed by **Jahnavi**
