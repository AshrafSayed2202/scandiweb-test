import React from 'react';

const products = [
    { sku: 'DVD001', name: 'DVD - Inception', price: 12.99, size: 700, type: 'DVD' },
    { sku: 'BK001', name: 'Book - Harry Potter', price: 9.99, weight: 1.2, type: 'Book' },
    { sku: 'FUR001', name: 'Chair', price: 49.99, dimensions: { height: 120, width: 60, length: 60 }, type: 'Furniture' },
];

const ProductList = () => {
    return (
        <div>
            <h1>Product List</h1>
            <button onClick={() => window.location.href = '/add-product'}>ADD</button>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.sku} className="product">
                        <input type="checkbox" className="delete-checkbox" />
                        <p>SKU: {product.sku}</p>
                        <p>Name: {product.name}</p>
                        <p>Price: ${product.price}</p>
                        {product.type === 'DVD' && <p>Size: {product.size} MB</p>}
                        {product.type === 'Book' && <p>Weight: {product.weight} Kg</p>}
                        {product.type === 'Furniture' && (
                            <p>Dimensions: {product.dimensions.height}x{product.dimensions.width}x{product.dimensions.length}</p>
                        )}
                    </div>
                ))}
            </div>
            <button>MASS DELETE</button>
        </div>
    );
};

export default ProductList;
