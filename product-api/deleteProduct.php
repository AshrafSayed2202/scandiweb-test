<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['sku'])) {
    $sku = $data['sku'];

    $query = 'DELETE FROM products WHERE sku = :sku';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':sku', $sku);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Product deleted successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error deleting product.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'SKU not provided.']);
}
?>
