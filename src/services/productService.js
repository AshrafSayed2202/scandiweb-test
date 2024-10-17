import axios from 'axios';

const API_URL = 'http://localhost/product-api'; // Base URL for PHP backend

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/getProducts.php`);
        return response.data; // Return the product list
    } catch (error) {
        console.error("Error fetching products", error);
        throw error;
    }
};
