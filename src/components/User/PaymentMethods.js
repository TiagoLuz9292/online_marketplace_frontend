import React, { useState, useEffect } from 'react';
import { getProfile, deletePaymentMethod } from '../../services/api'; // Add deletePaymentMethod

const PaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile();
                setPaymentMethods(profile.paymentMethods || []);
            } catch (err) {
                setError(err.response ? err.response.data : 'An error occurred while fetching payment methods');
            }
        };

        fetchProfile();
    }, []);

    const handleDelete = async (method) => {
        try {
            const data = {
                methodType: method.methodType,
                cardNumber: method.cardNumber,
                paypalEmail: method.paypalEmail,
            };
            await deletePaymentMethod(data);
            setPaymentMethods(paymentMethods.filter((m) => m !== method));
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred while deleting the payment method');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Payment Methods</h2>
            {error && <p className="text-danger">{error}</p>}
            <button 
                className="btn btn-primary mb-4"
                onClick={() => window.location.href = '/add-payment-method'}
            >
                Add Payment Method
            </button>
            {paymentMethods.length === 0 ? (
                <p>No payment methods available</p>
            ) : (
                <ul className="list-group">
                    {paymentMethods.map((method, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {method.methodType === 'credit_card' ? (
                                <div>
                                    <strong>Credit Card:</strong> {method.cardNumber} - Expires {method.expirationMonth}/{method.expirationYear}
                                </div>
                            ) : (
                                <div>
                                    <strong>PayPal:</strong> {method.paypalEmail}
                                </div>
                            )}
                            <button className="btn btn-danger" onClick={() => handleDelete(method)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PaymentMethods;
