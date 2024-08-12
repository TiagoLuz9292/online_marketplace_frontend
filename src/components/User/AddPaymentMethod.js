import React, { useState } from 'react';
import { addPaymentMethod } from '../../services/api';

const AddPaymentMethod = () => {
    const [methodType, setMethodType] = useState('');
    const [paypalEmail, setPaypalEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [cardName, setCardName] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');

    const handleAddMethod = async () => {
        const methodData = {
            methodType,
            paypalEmail: methodType === 'paypal' ? paypalEmail : null,
            cardNumber: methodType === 'credit_card' ? cardNumber : null,
            expirationMonth: methodType === 'credit_card' ? expirationMonth : null,
            expirationYear: methodType === 'credit_card' ? expirationYear : null,
            cardName: methodType === 'credit_card' ? cardName : null,
            cardSecret: methodType === 'credit_card' ? cvv : null,
        };

        try {
            await addPaymentMethod(methodData);
            setMessage('Payment method added successfully');
        } catch (err) {
            setMessage(err.response ? err.response.data.message : 'An error occurred');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Payment Method</h2>
            {message && <p className="mt-3 text-success">{message}</p>}
            <div className="mb-4">
                <button 
                    className={`btn btn-outline-primary ${methodType === 'paypal' ? 'active' : ''}`} 
                    onClick={() => setMethodType('paypal')}
                >
                    PayPal
                </button>
                <button 
                    className={`btn btn-outline-primary ms-2 ${methodType === 'credit_card' ? 'active' : ''}`} 
                    onClick={() => setMethodType('credit_card')}
                >
                    Credit Card
                </button>
            </div>
            {methodType === 'paypal' && (
                <div>
                    <div className="mb-3">
                        <label htmlFor="paypalEmail" className="form-label">PayPal Email</label>
                        <input type="email" className="form-control" id="paypalEmail" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} />
                    </div>
                    <button className="btn btn-primary" onClick={handleAddMethod}>Add</button>
                </div>
            )}
            {methodType === 'credit_card' && (
                <div>
                    <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">Card Number</label>
                        <input type="text" className="form-control" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expirationMonth" className="form-label">Expiration Month</label>
                        <input type="text" className="form-control" id="expirationMonth" value={expirationMonth} onChange={(e) => setExpirationMonth(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expirationYear" className="form-label">Expiration Year</label>
                        <input type="text" className="form-control" id="expirationYear" value={expirationYear} onChange={(e) => setExpirationYear(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cardName" className="form-label">Card Name</label>
                        <input type="text" className="form-control" id="cardName" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input type="text" className="form-control" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                    </div>
                    <button className="btn btn-primary" onClick={handleAddMethod}>Add</button>
                </div>
            )}
        </div>
    );
};

export default AddPaymentMethod;
