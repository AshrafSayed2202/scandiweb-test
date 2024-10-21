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
        $stmt->bindParam(':size', $product->getSize());
        $stmt->bindParam(':weight', $product->getWeight());
        $stmt->bindParam(':height', $product->getHeight());
        $stmt->bindParam(':width', $product->getWidth());
        $stmt->bindParam(':length', $product->getLength());

        return $stmt->execute();
    }

    public function getProducts() {
        $query = 'SELECT * FROM products';
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
