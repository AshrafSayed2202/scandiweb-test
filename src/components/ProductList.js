import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/productService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]); // Track selected products

    useEffect(() => {
        // Fetch products when the component mounts
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error loading products", error);
            }
        };
        getProducts();
    }, []);

    const handleCheckboxChange = (sku) => {
        // Toggle the selection of a product
        if (selectedProducts.includes(sku)) {
            setSelectedProducts(selectedProducts.filter((item) => item !== sku));
        } else {
            setSelectedProducts([...selectedProducts, sku]);
        }
    };

    const handleMassDelete = () => {
        // Remove selected products from the product list
        const updatedProducts = products.filter((product) => !selectedProducts.includes(product.sku));
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setSelectedProducts([]); // Clear the selected products after deletion
    };

    return (
        <div>
            <h1>Product List</h1>
            <Link to="/add-product">
                <button>Add Product</button>
            </Link>
            <button onClick={handleMassDelete}>MASS DELETE</button>
            <div>
                {products.map((product, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            className="delete-checkbox"
                            checked={selectedProducts.includes(product.sku)}
                            onChange={() => handleCheckboxChange(product.sku)}
                        />
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
