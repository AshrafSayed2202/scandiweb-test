<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include your config for DB connection
include 'config.php';

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if data is decoded properly
if ($data === null) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

// Extract product data from the decoded JSON
$sku = $data['sku'] ?? null;
$name = $data['name'] ?? null;
$price = $data['price'] ?? null;
$productType = $data['product_type'] ?? null;
$size = $data['size'] ?? null;
$weight = $data['weight'] ?? null;
$height = $data['height'] ?? null;
$width = $data['width'] ?? null;
$length = $data['length'] ?? null;

// Validation (Optional but recommended)
if (!$sku || !$name || !$price || !$productType) {
    echo json_encode(['success' => false, 'message' => 'Please provide all required fields']);
    exit;
}

try {
    // Check if SKU already exists
    $checkQuery = "SELECT COUNT(*) FROM products WHERE sku = :sku";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':sku', $sku);
    $checkStmt->execute();
    $skuExists = $checkStmt->fetchColumn();

    if ($skuExists > 0) {
        echo json_encode(['success' => false, 'message' => 'SKU already exists']);
        exit;
    }

    // Prepare SQL insert query
    $query = "INSERT INTO products (sku, name, price, product_type, size, weight, height, width, length) 
              VALUES (:sku, :name, :price, :productType, :size, :weight, :height, :width, :length)";

    $stmt = $db->prepare($query);
    // Bind parameters to the SQL query
    $stmt->bindParam(':sku', $sku);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':productType', $productType);
    $stmt->bindParam(':size', $size);
    $stmt->bindParam(':weight', $weight);
    $stmt->bindParam(':height', $height);
    $stmt->bindParam(':width', $width);
    $stmt->bindParam(':length', $length);

    // Execute the query
    $stmt->execute();

    // Send success response
    echo json_encode(['success' => true, 'message' => 'Product added successfully!']);
} catch (PDOException $e) {
    // Send error response
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>