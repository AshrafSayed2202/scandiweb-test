import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(new Set());

    useEffect(() => {
        // Fetch products from the API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://scandiweb-test.wuaze.com/product-api/getProducts.php');
                let data = response.data;
                if (typeof data === 'string') {
                    // Handle the concatenated JSON arrays
                    const jsonStrings = data.split('][').map(item => item.replace(/^\[|\]$/g, ''));
                    const parsedProducts = jsonStrings.flatMap(jsonString => JSON.parse(`[${jsonString}]`));
                    setProducts(parsedProducts);
                } else if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    throw new Error(`Expected an array but got: ${JSON.stringify(data)}`);
                }
            } catch (err) {
                console.error('Error loading products', err);
            }
        };

        fetchProducts();
    }, []);

    const handleSelectProduct = (sku) => {
        const newSelectedProducts = new Set(selectedProducts);
        if (newSelectedProducts.has(sku)) {
            newSelectedProducts.delete(sku);
        } else {
            newSelectedProducts.add(sku);
        }
        setSelectedProducts(newSelectedProducts);
    };

    const handleMassDelete = async () => {
        try {
            await Promise.all(
                Array.from(selectedProducts).map(sku =>
                    axios.post('http://scandiweb-test.wuaze.com/product-api/deleteProducts.php', { sku })
                )
            );
            // Refresh product list after deletion
            const response = await axios.get('http://scandiweb-test.wuaze.com/product-api/getProducts.php');
            setProducts(response.data);
            setSelectedProducts(new Set()); // Clear selection
        } catch (error) {
            console.error('Error deleting products', error);
        }
    };

    const renderSpecificData = (product) => {
        if (product.product_type === 'DVD') {
            return `Size: ${product.size} MB`;
        } else if (product.product_type === 'Book') {
            return `Weight: ${product.weight} Kg`;
        } else if (product.product_type === 'Furniture') {
            return `Dimensions: ${product.height}x${product.width}x${product.length}`;
        }
        return null;
    };

    return (
        <div>
            <div className='header'>
                <div>
                    <h1>Product List</h1>
                    <div className='btns'>
                        <Link to="/add-product">
                            <button>ADD</button>
                        </Link>
                        <button onClick={handleMassDelete} disabled={selectedProducts.size === 0}>
                            MASS DELETE
                        </button>
                    </div>
                </div>
            </div>
            {products.length > 0 ? (
                <div className="product-cards">
                    {products.map((product) => (
                        <div className="product-card" key={product.sku}>
                            <input
                                type="checkbox"
                                checked={selectedProducts.has(product.sku)}
                                onChange={() => handleSelectProduct(product.sku)}
                                className='delete-checkbox'
                            />
                            <h3>{product.name}</h3>
                            <p style={{ textTransform: 'uppercase' }}>SKU: {product.sku}</p>
                            <p>Price: {product.price} $</p>
                            <p>Type: {product.product_type}</p>
                            <p>{renderSpecificData(product)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default ProductsList;
