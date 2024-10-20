<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'config.php';

// Modify the query to select distinct SKUs
$query = 'SELECT DISTINCT * FROM products';
$stmt = $db->prepare($query);
$stmt->execute();
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($products) {
    echo json_encode($products);
} else {
    echo json_encode(['success' => false, 'message' => 'No products found.']);
}
?>
