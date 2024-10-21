<?php
abstract class Product {
    protected $sku;
    protected $name;
    protected $price;
    
    public function __construct($sku, $name, $price) {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
    }

    public function getSku() {
        return $this->sku;
    }

    public function getName() {
        return $this->name;
    }

    public function getPrice() {
        return $this->price;
    }

    abstract public function getSpecificAttribute();
    abstract public function getType();
    abstract public function getSize();
    abstract public function getWeight();
    abstract public function getHeight();
    abstract public function getWidth();
    abstract public function getLength();
}
?>
