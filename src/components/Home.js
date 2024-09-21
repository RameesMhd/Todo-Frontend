// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CommonStyle.scss';

function Home() {
  return (
    <div className='home-page'>
      <div className='home-page-wrapper'>
        <h1 className='text-center'>Welcome to the Todo App!</h1>
        <p className='text-center'>Please log in or register to continue.</p>
        <div className='btn-wrapper'>
          <Link className='btn btn-primary' to="/login">
            Login
          </Link>
          <Link className='btn btn-primary' to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
