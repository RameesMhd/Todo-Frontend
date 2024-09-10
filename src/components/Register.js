import React, { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button } from 'react-bootstrap';
import './Login.scss';
import avatar from '../assets/avatar.png';

export default function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/todos');
        } catch (error) {
            console.error('Error signing up:', error.message); // Log the error message to the console
            alert(`Failed to create an account: ${error.message}`);
        }
    }

    return (
        <Container className='login-container'>
            <Row className='justify-content-center mt-5'>
                <Col lg={4} md={6} sm={12} className='mt-5'>
                    <form onSubmit={handleSubmit} className='login-form d-flex flex-column p-2 justify-content-center align-items-center'>
                        <h1 className='text-center'>Register</h1>
                        <div>
                            <label htmlFor='profile'>
                                <img src={avatar} alt='avatar' className='profile-image' />
                            </label>
                        </div>
                        <div className='form-input d-flex flex-column align-items-center'>
                            <label>Register Now</label>
                            <input type="email" ref={emailRef} required placeholder="Email" />
                            <input type="password" ref={passwordRef} required placeholder="Password" />
                            <Button type='submit'>Register</Button>
                        </div>
                        <div className='d-flex justify-content-between flex-row gap-2'>
                            <span>Already have an account?</span>
                            <Link to="/login">Login</Link>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}
