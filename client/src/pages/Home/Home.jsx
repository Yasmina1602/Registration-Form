import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <>
      <div>Home page</div>
      <button className='btn mx-20' onClick={handleLogout}>Log out</button>
    </>
  );
}

export default Home;