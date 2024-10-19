<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['skus'])) {
    $skus = $data['skus'];

    $placeholders = implode(',', array_fill(0, count($skus), '?'));
    $query = "DELETE FROM products WHERE sku IN ($placeholders)";
    $stmt = $db->prepare($query);

    if ($stmt->execute($skus)) {
        echo json_encode(['success' => true, 'message' => 'Products deleted successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error deleting products.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No SKUs provided.']);
}
?>
