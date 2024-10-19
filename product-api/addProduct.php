<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['sku']) && !empty($data['name']) && !empty($data['price']) && !empty($data['product_type'])) {
    $sku = $data['sku'];
    $name = $data['name'];
    $price = $data['price'];
    $product_type = $data['product_type'];

    // Additional product attributes
    $size = $data['size'] ?? null;
    $weight = $data['weight'] ?? null;
    $height = $data['height'] ?? null;
    $width = $data['width'] ?? null;
    $length = $data['length'] ?? null;

    $query = 'INSERT INTO products (sku, name, price, product_type, size, weight, height, width, length)
            VALUES (:sku, :name, :price, :product_type, :size, :weight, :height, :width, :length)';
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':sku', $sku);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':product_type', $product_type);
    $stmt->bindParam(':size', $size);
    $stmt->bindParam(':weight', $weight);
    $stmt->bindParam(':height', $height);
    $stmt->bindParam(':width', $width);
    $stmt->bindParam(':length', $length);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Product added successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error adding product.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
}
?>
