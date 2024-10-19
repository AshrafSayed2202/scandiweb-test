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
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error("Expected an array but got:", response.data);
                }
            } catch (error) {
                console.error('Error loading products', error);
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

    return (
        <div>
            <h1>Products List</h1>
            <Link to="/add-product">
                <button>Add Product</button>
            </Link>
            <button onClick={handleMassDelete}>Mass Delete</button>
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
                    {Array.isArray(products) && products.map((product) => (
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
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsList;
