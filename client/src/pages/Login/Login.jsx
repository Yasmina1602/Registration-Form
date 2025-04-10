import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "./Login.css";

function Login() {
   const [email, setemail] = useState('')
   const [password, setpassword] = useState('')
   const [error, setError] = useState("");
   const navigate = useNavigate()

   const handleSubmit = async (e) => {
      e.preventDefault()
      setError("");

      try {
         const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
         })

         // **Server JSON qaytaryaptimi?**
         const text = await response.text();
         let data;
         try {
            data = JSON.parse(text);  // **JSON parse qilish**
         } catch {
            throw new Error("Server noto'g'ri javob qaytardi: " + text);
         }

         if (!response.ok) {
            throw new Error(data.message || "Login xatolik!")
         }

         localStorage.setItem("token", data.token);
         console.log("Token saqlandi:", data.token);

         navigate('/home');
      }
      catch (err) {
         console.error("Server yoki tarmoq xatosi:", err); // **Faqat katta xatoliklarni chiqaramiz**
         setError(err.message);
      }
   }

   return (
      <div>
         <div className="content">
            <div className="text">
               Login Form
            </div>
            <form onSubmit={handleSubmit}>
               <div className="field">
                  <input
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setemail(e.target.value)}
                     required />
                  <span className="fas fa-envelope"></span>
               </div>
               <div className="field">
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setpassword(e.target.value)}
                     required />
                  <span className="fas fa-lock"></span>
                  <label>Password</label>
               </div>
               <div className="forgot-pass">
                  <a href="/forgotPass">Forgot Password?</a>
               </div>

               {error && <p className="danger">{error}</p>}

               <button type="submit">Sign in</button>
               <div className="sign-up">
                  Not a member?
                  <a href="/register"> signup now</a>
               </div>
            </form>
         </div>
      </div>
   )
}

export default Login