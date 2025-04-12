import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

import "./ForgotPass.css";

const ForgotPass = () => {
  const [email, setemail] = useState('')
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handlePass = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/setting/forgotPass", { email });
      alert(response.data.message);
      navigate('/verifyCode');
    } catch (err) {
      console.error("Error message:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : err.message);
    }
  }

  return (
    <>
      <div>
        <div className="content">
          <div className="text">
            Forgot Password
          </div>
          <form onSubmit={handlePass}>
            <div className="field">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required />
              <span className="fas fa-envelope"></span>
            </div>

            {error && <p className="danger">{error}</p>}

            <button type="submit">Send</button>
            <div className="sign-up">
              Return to <a href="/register"> Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPass