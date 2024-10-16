import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [productType, setProductType] = useState('');
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState('');
    const [dimensions, setDimensions] = useState({ height: '', width: '', length: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleTypeChange = (e) => {
        setProductType(e.target.value);
        setErrorMessage('');
    };
    const handleSave = (e) => {
        e.preventDefault();

        // Validate common fields
        if (!sku || !name || !price) {
            setErrorMessage('Please, submit required data.');
            return;
        }

        // Validate product type-specific fields
        if (productType === 'DVD' && !size) {
            setErrorMessage('Please, provide size for the DVD.');
            return;
        }
        if (productType === 'Book' && !weight) {
            setErrorMessage('Please, provide weight for the Book.');
            return;
        }
        if (productType === 'Furniture' && (!dimensions.height || !dimensions.width || !dimensions.length)) {
            setErrorMessage('Please, provide dimensions for the Furniture.');
            return;
        }

        // Product object
        const newProduct = { sku, name, price, productType, size, weight, dimensions };

        // Save to local storage
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        existingProducts.push(newProduct);
        localStorage.setItem('products', JSON.stringify(existingProducts));

        navigate('/');
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Add Product</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form id="product_form" onSubmit={handleSave}>
                <label>SKU:</label>
                <input id="sku" type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />

                <label>Name:</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Price:</label>
                <input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />

                <label>Product Type:</label>
                <select id="productType" value={productType} onChange={handleTypeChange} required>
                    <option value="">Select Type</option>
                    <option value="DVD">DVD</option>
                    <option value="Book">Book</option>
                    <option value="Furniture">Furniture</option>
                </select>

                {productType === 'DVD' && (
                    <div>
                        <label>Size (MB):</label>
                        <input id="size" type="number" value={size} onChange={(e) => setSize(e.target.value)} required />
                    </div>
                )}
                {productType === 'Book' && (
                    <div>
                        <label>Weight (Kg):</label>
                        <input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                    </div>
                )}
                {productType === 'Furniture' && (
                    <div>
                        <label>Height (CM):</label>
                        <input id="height" type="number" value={dimensions.height} onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })} required />
                        <label>Width (CM):</label>
                        <input id="width" type="number" value={dimensions.width} onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })} required />
                        <label>Length (CM):</label>
                        <input id="length" type="number" value={dimensions.length} onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })} required />
                    </div>
                )}

                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AddProduct;
