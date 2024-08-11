import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../services/api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending login request with:', formData);
            const response = await login(formData);
            console.log('Login response:', response);
            localStorage.setItem('token', response.token); // Store the token in local storage
            localStorage.setItem('userId', response.userId); // Store the userId in local storage

            toast.success('Login successful', {
                position: "top-right", // Use string directly for the position
                autoClose: 2000 // Notification disappears after 3 seconds
            });

            
            // Reload the page to reflect changes immediately
            navigate('/');
            window.location.reload(); // Reload the page to reflect changes
           
        } catch (err) {
            console.error('Login error:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data : 'An error occurred');
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {error && <p className="text-danger mt-3">{typeof error === 'object' ? JSON.stringify(error) : error}</p>}
            </form>
        </div>
    );
};

export default Login;
