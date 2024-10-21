<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require 'Database.php';

$db = new Database();
$products = $db->getProducts();

if ($products) {
    echo json_encode($products);
} else {
    echo json_encode(['success' => false, 'message' => 'No products found.']);
}
?>
