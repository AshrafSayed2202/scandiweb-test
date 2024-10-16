import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from local storage
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <Link to="/add-product">
                <button>Add Product</button>
            </Link>
            <button>MASS DELETE</button>
            <div>
                {products.map((product, index) => (
                    <div key={index}>
                        <input type="checkbox" className="delete-checkbox" />
                        <p>{product.sku} - {product.name} - ${product.price}</p>
                        {product.productType === 'DVD' && <p>Size: {product.size} MB</p>}
                        {product.productType === 'Book' && <p>Weight: {product.weight} Kg</p>}
                        {product.productType === 'Furniture' && (
                            <p>Dimensions: {product.dimensions.height}x{product.dimensions.width}x{product.dimensions.length} CM</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
