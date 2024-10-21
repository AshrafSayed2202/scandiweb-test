<?php
require 'Product.php';

class DVD extends Product {
    private $size;

    public function __construct($sku, $name, $price, $size) {
        parent::__construct($sku, $name, $price);
        $this->size = $size;
    }

    public function getSpecificAttribute() {
        return "Size: {$this->size} MB";
    }

    public function getType() {
        return 'DVD';
    }

    public function getSize() {
        return $this->size;
    }

    public function getWeight() {
        return null;
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
