import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8888/api/v1/product/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setProduct(response.data);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center my-5">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center my-5">Product not found</div>;
    }

    return (
        
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        alt={product.product_name}
                        src={`http://localhost:8888/${product.image}`}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-6">
                    <h2 className="mb-3">{product.product_name}</h2>
                    <p className="text-muted mb-2">Category: <span className="fw-bold">{product.Category.category_name}</span></p>
                    <p className="text-danger h4 mb-3">Price: {product.price}đ</p>
                    <p><strong>Description:</strong></p>
                    <p>{product.description}</p>
                    <p className="mb-3">Available Quantity: <strong>{product.quantity}</strong></p>
                    <div className="d-flex">
                        <button className="btn btn-primary me-2">
                            <i className="bi bi-cart-plus"></i> Add to Cart
                        </button>
                        <button className="btn btn-success">
                            <i className="bi bi-bag"></i> Buy Now
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
