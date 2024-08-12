import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                setProducts(products);
            } catch (err) {
                setError(err.response && err.response.data ? err.response.data.message : 'An error occurred');
            }
        };

        fetchProducts();
    }, []);

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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;