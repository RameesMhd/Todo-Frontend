import React, { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import { Col, Container, Row, Button } from 'react-bootstrap';
import './Login.scss';
import avatar from '../assets/avatar.png';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const navigate = useNavigate();  // Initialize useNavigate

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/todos');  // Use navigate instead of history.push
        } catch {
            alert('Failed to log in');
        }
    }

    return (
        <div className='login-container'>
            <div className='login-wrapper'>
                <form onSubmit={handleSubmit} className='login-form d-flex flex-column p-2 justify-content-center align-items-center'>
                    <h1 className='text-center'>Login</h1>
                    <div>
                        <label htmlFor='profile'>
                            <img src={avatar} alt='avatar' className='profile-image' />
                        </label>
                    </div>
                    <div className='form-input d-flex flex-column align-items-center'>
                        <label>Login Now</label>
                        <input type="email" ref={emailRef} required placeholder="Email" />
                        <input type="password" ref={passwordRef} required placeholder="Password" />
                        <Button type='submit'>Log In</Button>
                    </div>
                    <div className='d-flex justify-content-between flex-row gap-2'>
                        <span>Don't have an account?</span>
                        <Link to="/register">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
