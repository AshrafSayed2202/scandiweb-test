<?php
$servername = "localhost";
$username = "root";  // default for XAMPP
$password = "";      // leave blank if not set
$dbname = "scandiweb"; // your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get product data from request
$data = json_decode(file_get_contents("php://input"));

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO products (sku, name, price, product_type, size, weight, height, width, length) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssdssiiii", $data->sku, $data->name, $data->price, $data->productType, $data->size, $data->weight, $data->dimensions->height, $data->dimensions->width, $data->dimensions->length);

// Execute
if ($stmt->execute()) {
    echo json_encode(["message" => "Product added successfully"]);
} else {
    echo json_encode(["message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
