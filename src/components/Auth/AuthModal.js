import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, register } from '../../services/api';

const AuthModal = ({ isOpen, toggle }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError(''); // Clear errors when toggling between forms
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            if (isLogin) {
                const response = await login(formData);
                localStorage.setItem('token', response.token);
                localStorage.setItem('userId', response.userId);
                toast.success('Login successful');
                toggle();
                navigate('/');
                window.location.reload(); // Reload to reflect changes
            } else {
                if (formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    return;
                }
                const response = await register(formData);
                toast.success(response.message || 'Registration successful');
                toggle();
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            // Extract the error message
            const errorMessage = err.response && err.response.data && err.response.data.message 
                ? err.response.data.message 
                : 'An error occurred';
            setError(errorMessage);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                {isLogin ? 'Login' : 'Register'}
            </ModalHeader>
            <ModalBody>
                {!isLogin && (
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </FormGroup>
                )}
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </FormGroup>
                {!isLogin && (
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input 
                            type="password" 
                            name="confirmPassword" 
                            id="confirmPassword" 
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </FormGroup>
                )}
                {error && <p className="text-danger">{error}</p>}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
            <div className="text-center mb-3">
                <Button color="link" onClick={toggleForm}>
                    {isLogin ? 'Need an account? Register here' : 'Already have an account? Login here'}
                </Button>
            </div>
        </Modal>
    );
};

export default AuthModal;
