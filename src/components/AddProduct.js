import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [productType, setProductType] = useState('');
    const navigate = useNavigate();

    const handleTypeChange = (e) => {
        setProductType(e.target.value);
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Save product logic will be added later
        navigate('/');
    };

    return (
        <div>
            <h1>Add Product</h1>
            <form id="product_form" onSubmit={handleSave}>
                <label>SKU:</label>
                <input id="sku" type="text" required />

                <label>Name:</label>
                <input id="name" type="text" required />

                <label>Price:</label>
                <input id="price" type="number" step="0.01" required />

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
                        <input id="size" type="number" required />
                    </div>
                )}
                {productType === 'Book' && (
                    <div>
                        <label>Weight (Kg):</label>
                        <input id="weight" type="number" required />
                    </div>
                )}
                {productType === 'Furniture' && (
                    <div>
                        <label>Height (CM):</label>
                        <input id="height" type="number" required />
                        <label>Width (CM):</label>
                        <input id="width" type="number" required />
                        <label>Length (CM):</label>
                        <input id="length" type="number" required />
                    </div>
                )}

                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AddProduct;
