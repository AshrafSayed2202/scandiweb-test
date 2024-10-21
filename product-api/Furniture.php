<?php
require 'Product.php';

class Furniture extends Product {
    private $height;
    private $width;
    private $length;

    public function __construct($sku, $name, $price, $height, $width, $length) {
        parent::__construct($sku, $name, $price);
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
    }

    public function getSpecificAttribute() {
        return "Dimensions: {$this->height} x {$this->width} x {$this->length} CM";
    }

    public function getType() {
        return 'Furniture';
    }

    public function getSize() {
        return null;
    }

    public function getWeight() {
        return null;
    }

    public function getHeight() {
        return $this->height;
    }

    public function getWidth() {
        return $this->width;
    }

    public function getLength() {
        return $this->length;
    }
}
?>
