import React, { useState, useEffect } from 'react';
import { getUserProducts, deleteProduct } from '../../services/api';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getUserProducts();
                setProducts(products);
            } catch (err) {
                setError(err.response ? err.response.data : 'An error occurred');
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts(products.filter(product => product._id !== productId));
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred');
        }
    };

    return (
        <div className="product-list-container">
            <div className="product-list">
                {error && <p className="text-danger">{error}</p>}
                    {products.map(product => (
                        <div key={product.id} className="product-item">
                            <div className="card">
                                <img src={`http://localhost:3001${product.imageUrl}`} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <p className="card-text product-description">{product.description}</p>
                                    <p className="card-text product-price">${product.price.toFixed(2)}</p>
                                    <button onClick={() => handleDelete(product._id)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>  
        </div>
    );
};

export default MyProducts;
