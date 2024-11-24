<?php
require 'config.php';

class Database {
    private $connection;

    public function __construct() {
        global $db;
        $this->connection = $db;
    }

    public function addProduct($product) {
        $query = 'INSERT INTO products (sku, name, price, product_type, size, weight, height, width, length)
        VALUES (:sku, :name, :price, :product_type, :size, :weight, :height, :width, :length)';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':sku', $product->getSku());
        $stmt->bindParam(':name', $product->getName());
        $stmt->bindParam(':price', $product->getPrice());
        $stmt->bindParam(':product_type', $product->getType());
        $stmt->bindValue(':size', value: $product->getSize() ?? null);  
        $stmt->bindValue(':weight', $product->getWeight() ?? null); 
        $stmt->bindValue(':height', $product->getHeight() ?? null); 
        $stmt->bindValue(':width', $product->getWidth() ?? null); 
        $stmt->bindValue(':length', $product->getLength() ?? null); 

        return $stmt->execute();
    }

    public function getProducts() {
        try {
            // Query to fetch all products
            $query = 'SELECT * FROM products';
            $stmt = $this->connection->prepare($query);
            $stmt->execute();
    
            // Return fetched products
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // Handle query execution errors
            throw new Exception("Error fetching products: " . $e->getMessage());
        }
    }
    
}
?>
