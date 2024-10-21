<?php
require 'Product.php';

class Book extends Product {
    private $weight;

    public function __construct($sku, $name, $price, $weight) {
        parent::__construct($sku, $name, $price);
        $this->weight = $weight;
    }

    public function getSpecificAttribute() {
        return "Weight: {$this->weight} Kg";
    }

    public function getType() {
        return 'Book';
    }

    public function getSize() {
        return null;
    }

    public function getWeight() {
        return $this->weight;
    }

    public function getHeight() {
        return null;
    }

    public function getWidth() {
        return null;
    }

    public function getLength() {
        return null;
    }
}
?>
