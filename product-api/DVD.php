<?php
require_once 'Product.php';

class DVD extends Product {
    private $size;

    public function __construct($sku, $name, $price, $size) {
        parent::__construct($sku, $name, $price, 'DVD');
        $this->size = $size;
    }

    public function getSpecificAttribute() {
        return $this->size;
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
