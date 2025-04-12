import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const NewPass = () => {
  const [newPass, setnewPass] = useState('')
  const [verifyNewPass, setverifyNewPass] = useState('')
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handlePass = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/setting/newPass", { newPass, verifyNewPass });
      alert(response.data.message);
      navigate('/login');
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
            Set a New Password
          </div>
          <form onSubmit={handlePass}>
            <div className="field">
              <input
                type="password"
                placeholder="new password"
                value={newPass}
                onChange={(e) => setnewPass(e.target.value)}
                required />
              <span className="fas fa-lock"></span>
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="re-enter password"
                value={verifyNewPass}
                onChange={(e) => setverifyNewPass(e.target.value)}
                required />
              <span className="fas fa-lock"></span>
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

export default NewPass