<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require 'Database.php';
require 'DVD.php';
require 'Book.php';
require 'Furniture.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['sku']) && isset($data['name']) && isset($data['price']) && isset($data['product_type'])) {
    switch ($data['product_type']) {
        case 'DVD':
            $product = new DVD($data['sku'], $data['name'], $data['price'], $data['size']);
            break;
        case 'Book':
            $product = new Book($data['sku'], $data['name'], $data['price'], $data['weight']);
            break;
        case 'Furniture':
            $product = new Furniture($data['sku'], $data['name'], $data['price'], $data['height'], $data['width'], $data['length']);
            break;
        default:
            echo json_encode(['success' => false, 'message' => 'Invalid product type.']);
            exit;
    }

    $db = new Database();
    $result = $db->addProduct($product);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Product added successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error adding product.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
}
?>
