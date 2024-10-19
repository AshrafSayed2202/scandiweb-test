<?php
include 'config.php'; // Include database connection

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

// Check if 'skus' is an array in the request payload
if (isset($data['skus']) && is_array($data['skus'])) {
    $skus = $data['skus'];

    // Prepare SQL statement to delete multiple SKUs
    $placeholders = implode(',', array_fill(0, count($skus), '?'));
    $sql = "DELETE FROM products WHERE sku IN ($placeholders)";
    
    $stmt = $conn->prepare($sql);
    
    // Bind the SKU values dynamically
    $stmt->bind_param(str_repeat('s', count($skus)), ...$skus);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Products deleted successfully']);
    } else {
        echo json_encode(['message' => 'Error deleting products']);
    }
    
    $stmt->close();
} else {
    echo json_encode(['message' => 'No valid SKUs provided']);
}

$conn->close();
?>