import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "./Register.css";

function Register() {
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Register xatolik!")
      }

      localStorage.setItem("token", data.token);
      console.log("Token saqlandi:", data.token);

      navigate('/home');
    }
    catch (err) {
      console.error("Server yoki tarmoq xatosi:", err); // Faqat katta xatoliklarni chiqaramiz
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="content">
        <div className="text">
          Register Form
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required />
            <span className="fas fa-user"></span>
            <label>Username</label>
          </div>
          <div className="field">
            <input
              type="email"
              placeholder="Emailni kiriting"
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

          { error && <p className="danger">{error}</p>}

          <button type="submit">Sign up</button>
          <div className="sign-up">
            Already have account?
            <a href="/login"> login now</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register