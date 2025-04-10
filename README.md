# 🚀 Registration Form - MERN Stack

![GitHub repo size](https://img.shields.io/github/repo-size/Yasmina1602/Registration-Form)
![GitHub last commit](https://img.shields.io/github/last-commit/Yasmina1602/Registration-Form)
![Made with Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)

---

📝 **Description:**

This is a full-stack **Registration and Login** system built with the **MERN stack** (MongoDB, Express, React, Node.js). It includes:

- User Registration  
- Email Verification with Code  
- Password Reset via Email  
- Secure Password Hashing  
- Responsive Frontend

---

⚙️ **Technologies Used:**

- 🟢 **MongoDB** (database)
- ⚙️ **Express.js** (backend framework)
- 🌐 **React.js** (frontend library)
- 🔵 **Node.js** (runtime environment)
- 🔐 **Bcrypt** (for password hashing)
- 📬 **Nodemailer** (for email verification)
- 🔐 **Environment Variables**: `dotenv` for secure configuration
- jwt web token

---

## 📸 App views
![Full Page's](client/public/screenshots/full-page.png)  
> All pages in the project

---

### 🔑 Login Page
![Login Page](client/public/screenshots/login-validation.png)  
> The login page only allows existing users to access the home page.

---

### 🧾 Register Page
![Register Page](client/public/screenshots/register-page.png)  
> New users can sign up using this form.

---

### 🏠 Home Page
![Home Page](client/public/screenshots/home-page.png)  
> The default landing page after opening the application. log out

---

### 🔑 Security 
![Login Page](client/public/screenshots/login-validation.png)  
> The login page only allows existing users to access the home page.

---

### ❓ Forgot Password Page
![Forgot Password Page](client/public/screenshots/forgot-password.png)  
> Users can request a password reset by entering their email.

---

### ✅ Verify Code Page
![Verify Code Page](client/public/screenshots/verify-code.png)  
> After receiving the email, users must enter a 4-digit verification code.

---

### 🔒 Set New Password Page
![New Password Page](client/public/screenshots/new-password.png)  
> Users can create a new password after successful verification.

---

## 📁 Folder Structure

```bash
├── client/               # React frontend
│   └── public/screenshots/   # Screenshots used in README
├── server/               # Express backend
├── .env                  # Environment variables
├── README.md

---

💻 **Setup Instructions (Backend):**

```bash
# 1. Clone the repo
git clone https://github.com/Yasmina1602/Registration-Form

# 2. Go to the backend folder
cd Registration-Form/server

# 3. Install dependencies
npm install

# 4. Edit .env file and add your Mongo URI and email credentials
PORT=5000
JWT_SECRET=you_can_change
MONGO_URI=your_mongo_connection_string
USER_EMAIL=your_email@gmail.com
APP_PASSWORD=your_app_password

# 5. Run the server
npm start
```

---

💻 **Setup Instructions (Frontend):**

```bash
# 1. Go to the client folder
cd ../client

# 2. Install dependencies
npm install

# 3. Run the frontend
npm run dev
```
---

🙋‍♀️ Author:
Yasmina1602 on GitHub
