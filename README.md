# 🎓 Mentorium - Empowering Learning, Enabling Teaching

![React](https://img.shields.io/badge/React-18.x-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Styled-blueviolet)
![Firebase](https://img.shields.io/badge/Firebase-Auth-yellow)
![Stripe](https://img.shields.io/badge/Stripe-Payments-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

Mentorium is a **full-featured MERN stack** online education platform where **students** can enroll in classes, **teachers** can manage their offerings, and **admins** control and maintain the ecosystem via secure role-based access.

---

## 🌐 Live Website

🔗 [Visit Mentorium Now](https://rafiqmia-mentorium.netlify.app/)

---

## 🔐 Admin Demo Login

- **Email:** `admin@gmail.com`
- **Password:** `Admin123`

> ⚠️ For demo/testing purposes only.

---

## 🚀 Features at a Glance

- 🔐 Firebase Authentication (Email & Google)
- 🔁 JWT-secured communication with server
- 🧑‍💼 Role-based Dashboard: Student | Teacher | Admin
- 📝 Teacher Application & Approval Workflow
- 📚 Class Management (Create, Update, Delete, Approve)
- 💳 Stripe Payment Integration
- 🧑‍🎓 Student Enrollment, Feedback & Assignments
- 📊 Admin Dashboard with Real-time Stats
- ☁️ Cloudinary for Image Uploads
- 🌙 Light/Dark Mode Toggle
- 🔍 Search and Filter (Admin Panel)
- 🎨 Modular, Maintainable React Architecture

---

## 🧑‍💻 Folder Structure (Client)

```
mentorium-client/
├── public/
├── src/
│   ├── assets/
│   ├── Firebase/
│   ├── Hook/
│   ├── Layouts/
│   ├── pages/
│   │   ├── AboutUs/
│   │   ├── AllClasses/
│   │   ├── ClassDetails/
│   │   ├── Dashboard/
│   │   │   ├── AdminPages/
│   │   │   ├── StudentPages/
│   │   │   └── TeacherPages/
│   │   ├── Profile/
│   │   ├── Login/
│   │   ├── SignUp/
│   │   └── ErrorPage/
│   ├── provider/
│   ├── routes/
│   ├── shared/
│   ├── App.jsx
│   ├── main.jsx
└── ...
```

---

## 📦 Tech Stack

| Category       | Technologies                                |
|----------------|---------------------------------------------|
| Frontend       | React.js, Tailwind CSS, DaisyUI             |
| State/Data     | React Query, React Hook Form                |
| Backend API    | Node.js, Express.js (mentorium-server)      |
| Database       | MongoDB (via Mongoose)                      |
| Auth           | Firebase Authentication                     |
| Payments       | Stripe API                                  |
| Images         | Cloudinary API                              |
| UX/UI          | SweetAlert2, Framer Motion, Lottie          |

---

## ⚙️ Setup Instructions

### 🖥 Client Setup

```bash
git clone https://github.com/rafiqmia65/mentorium-client.git
npm install
npm run dev
```

### 🛠 Server Setup
---


```bash
git clone https://github.com/rafiqmia65/mentorium-server.git
npm install
npm run dev
```

> Uses `nodemon` for development.

---

> Client: `http://localhost:5173` | Server: `http://localhost:3000`

---

## 👥 User Roles & Permissions

### 👤 Student

- Enroll in classes
- Submit assignments and give feedback

### 👩‍🏫 Teacher

- Manage their own classes and view student info

### 👨‍💼 Admin

- Approve teachers and classes
- Manage all users and feedback
- Access platform analytics

---

## 🧪 Workflow Overview

1. Sign up as Student or Teacher
2. Apply to become Teacher (if applicable)
3. Admin approves/rejects request
4. Teachers manage their classes
5. Students enroll, pay, and learn
6. Admin oversees entire platform

---



---

## 👨‍💻 Developer Info

- **👤 Name:** Md Rafiq Mia  
- **🌐 Portfolio:** [rafiqmia.netlify.app](https://rafiqmia.netlify.app/)  
- **💼 LinkedIn:** [rafiqmia65](https://www.linkedin.com/in/rafiqmia65/)  
- **📁 GitHub:** [rafiqmia65](https://github.com/rafiqmia65)  

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).