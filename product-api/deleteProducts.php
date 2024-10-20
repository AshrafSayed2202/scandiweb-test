<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Log file for debugging
$logFile = 'delete_log.txt';

// Get the raw POST data and decode it
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['sku'])) {
    $sku = $data['sku'];
    file_put_contents($logFile, "Received SKU: $sku\n", FILE_APPEND);

    // Database connection
    $servername = "sql310.infinityfree.com";
    $username = "if0_37538183";
    $password = "xv56p97n";
    $dbname = "if0_37538183_products_db";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        file_put_contents($logFile, "Connection failed: " . $conn->connect_error . "\n", FILE_APPEND);
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL delete statement
    $stmt = $conn->prepare("DELETE FROM products WHERE sku = ?");
    if ($stmt === false) {
        file_put_contents($logFile, "Prepare failed: " . $conn->error . "\n", FILE_APPEND);
        die("Prepare failed: " . $conn->error);
    }

    // Bind the parameter
    $stmt->bind_param("s", $sku);

    // Execute the statement
    if ($stmt->execute()) {
        file_put_contents($logFile, "Successfully deleted SKU: $sku\n", FILE_APPEND);
        echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);
    } else {
        file_put_contents($logFile, "Error deleting product: " . $stmt->error . "\n", FILE_APPEND);
        echo json_encode(['success' => false, 'message' => 'Error deleting product']);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    file_put_contents($logFile, "SKU not set in request\n", FILE_APPEND);
    echo json_encode(['success' => false, 'message' => 'SKU not provided']);
}
?>
