<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Include Database connection
require 'Database.php';

try {
    // Initialize the Database object
    $db = new Database();
    // Fetch products
    $products = $db->getProducts();

    // Check if products were retrieved
    if ($products) {
        echo json_encode(['success' => true, 'data' => $products]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No products found.']);
    }
} catch (Exception $e) {
    // Handle any errors in the database connection or fetching
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
