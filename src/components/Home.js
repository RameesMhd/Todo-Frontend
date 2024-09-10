// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='wrapper container mt-5'>
      <h1 className='text-center'>Welcome to the Todo App!</h1>
      <p className='text-center'>Please log in or register to continue.</p>
      <div className='btn-wrapper'>
        <Link to="/login">
          <button className='btn btn-primary'>Login</button>
        </Link>
        <Link to="/register">
          <button className='btn btn-primary'>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
