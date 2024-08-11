import React, { useState } from 'react';
import { requestPasswordReset } from '../../services/api';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await requestPasswordReset(email);
            alert(response.data.message);
        } catch (err) {
            alert(err.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={handleChange} />
            <button type="submit">Request Password Reset</button>
        </form>
    );
};

export default RequestPasswordReset;
