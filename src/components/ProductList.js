import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products from the API
        const fetchProducts = async () => {
            setError(null); // Reset error state
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
                setError(err.message);
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
            console.log("Selected SKUs: ", selectedProducts); // Log selected SKUs
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


    return (
        <div>
            <h1>Products List</h1>
            <Link to="/add-product">
                <button>Add Product</button>
            </Link>
            <button onClick={handleMassDelete} disabled={selectedProducts.size === 0}>
                Mass Delete
            </button>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {products.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>SKU</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.sku}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.has(product.sku)}
                                        onChange={() => handleSelectProduct(product.sku)}
                                    />
                                </td>
                                <td>{product.sku}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.product_type}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default ProductsList;
