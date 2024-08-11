import React, { useState } from 'react';
import { addProduct } from '../../services/api';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('currency', formData.currency);
        if (image) {
            data.append('image', image);
        }

        try {
            const response = await addProduct(data);
            setMessage(response.message);
        } catch (err) {
            setMessage(err.response ? err.response.data : 'An error occurred');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price" onChange={handleChange} step="0.01"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="currency" className="form-label">currency</label>
                    <input type="text" className="form-control" id="currency" name="currency" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
                {message && <p className="mt-3">{typeof message === 'string' ? message : JSON.stringify(message)}</p>}
            </form>
        </div>
    );
};

export default AddProduct;