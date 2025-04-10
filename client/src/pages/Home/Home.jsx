import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Tokenni o‘chiramiz
    navigate("/login"); // Login sahifasiga yo‘naltiramiz
  };

  return (
    <>
      <div>Bosh sahifa</div>
      <button className='btn mx-20' onClick={handleLogout}>Log out</button>
    </>
  );
}

export default Home;
