import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch {
            alert('Failed to log out');
        }
    }

    return (
        <button className="btn btn-warning" onClick={handleLogout}>
            Log Out
        </button>
    );
}
