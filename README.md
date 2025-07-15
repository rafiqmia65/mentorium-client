# 🎓 Mentorium - Empowering Learning, Enabling Teaching

Mentorium is a MERN stack-based online education platform where students can explore high-quality classes, teachers can manage their offerings, and admins can oversee the entire learning ecosystem. It ensures a smooth and secure learning experience with role-based dashboards and payment support.

---

## 🌐 Live Website

🔗 [Visit Mentorium Now](https://rafiqmia-mentorium.netlify.app/)

---

## 🔐 Admin Demo Login

- **Email:** `admin@gmail.com`
- **Password:** `Admin123`

> ⚠️ For demo/testing purposes only. Do not misuse.

---

## 🚀 Key Features

- 🔐 Firebase Authentication (Email/Password & Google Login)
- 🔁 JWT-based secure API communication
- 🧑‍💼 Role-based Dashboard: Student | Teacher | Admin
- 📝 Teacher Application & Approval Workflow
- 📚 Full Class Lifecycle: Create, Update, Delete, Approve
- 💳 Stripe Integration for Secure Payments
- 🧑‍🎓 Student Enrollment, Feedback & Assignment Flow
- 📈 Admin Dashboard with Real-Time Stats
- ☁️ Cloudinary Integration for Image Uploads
- 🌗 Light/Dark Theme Toggle with Persistence
- 🔍 Server-side Search on Users (Admin Panel)
- 📦 Modular React Codebase with Reusable Components

---

## 📦 Tech Stack

| Category       | Tools & Technologies                          |
| -------------- | --------------------------------------------- |
| Frontend       | React.js, Tailwind CSS, DaisyUI               |
| State/Data     | TanStack Query (React Query), React Hook Form |
| Backend        | Node.js, Express.js                           |
| Database       | MongoDB (Mongoose ODM)                        |
| Authentication | Firebase Auth + Firebase Admin SDK            |
| Payment        | Stripe.js + React Stripe                      |
| Image Upload   | Cloudinary API                                |
| Alerts & UX    | SweetAlert2, Framer Motion, Lottie            |

---

## ⚙️ Installation & Setup Instructions

### 🔧 Prerequisites

- Node.js ≥ 18.x
- MongoDB Atlas URI or Local MongoDB
- Firebase Project with Admin SDK (base64)
- Stripe Test Keys

### 🖥 Client Setup

```bash
git clone https://github.com/your-username/mentorium.git
cd mentorium-client
npm install
npm run dev
```

### 🛠 Server Setup

```bash
cd ../mentorium-server
npm install
```

Create `.env` file in `mentorium-server`:

```
PORT=3000
MONGODB_URI=your_mongodb_uri
FB_SERVICE_KEY=base64_encoded_firebase_admin_sdk_json
```

Then run:

```bash
nodemon index.js
```

> Now your app should be running at `http://localhost:5173` and server at `http://localhost:3000`

---

## 🧑‍💻 User Roles & Access

### 👤 Student

- Explore and enroll in approved classes
- Submit assignments and provide feedback
- Apply to become a teacher

### 👩‍🏫 Teacher

- Create, update, delete their own classes
- Monitor student enrollments and progress

### 👨‍💼 Admin

- Approve/reject teacher applications & classes
- Manage users, classes, and reviews
- View dashboard statistics

---

## 🧪 How to Use the App

1. **Sign Up** using Email/Password or Google
2. **Apply** as Teacher through "Teach on Mentorium"
3. **Admin Reviews** and approves application
4. **Teacher Creates** and manages their classes
5. **Student Enrolls** and interacts via class dashboard
6. **Admin/Teachers Monitor** class performance and feedback

---

## 📸 Screenshots

> You can add screenshots in a `/screenshots` folder and display here like:

```md
![Homepage](./screenshots/home.png)
![Dashboard](./screenshots/dashboard.png)
```

---

## 🙋‍♂️ Developer Info

- **Name:** Md Rafiq Mia
- **GitHub:** [@your-username](https://github.com/rafiqmia65)
- **Portfolio:** [your-portfolio-link](https://rafiqmia.netlify.app/)
- **LinkedIn:** [your-linkedin-profile](https://www.linkedin.com/in/rafiqmia65/)

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).
