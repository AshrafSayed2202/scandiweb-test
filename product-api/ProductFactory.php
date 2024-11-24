<?php
require_once 'DVD.php';
require_once 'Book.php';
require_once 'Furniture.php';

class ProductFactory {
    public static function createProduct($data) {
        $productClass = ucfirst(strtolower($data['product_type']));
        if (class_exists($productClass)) {
            return new $productClass($data['sku'], $data['name'], $data['price'], $data);
        }
        return false;
    }
}
?>
