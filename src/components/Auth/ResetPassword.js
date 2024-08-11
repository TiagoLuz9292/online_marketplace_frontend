import React, { useState } from 'react';
import { resetPassword } from '../../services/api';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        token: '',
        newPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword(formData);
            alert(response.data);
        } catch (err) {
            alert(err.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="token" placeholder="Reset Token" onChange={handleChange} />
            <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;
