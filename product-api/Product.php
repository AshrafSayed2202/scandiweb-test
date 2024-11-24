<?php
abstract class Product {
    protected $sku;
    protected $name;
    protected $price;
    protected $productType; 

    public function __construct($sku, $name, $price, $productType) {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->productType = $productType; 
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

    public function getProductType() {
        return $this->productType;
    }

    
    abstract public function getSpecificAttribute(); 

    
    abstract public function getSize(); 
    abstract public function getWeight(); 
    abstract public function getHeight(); 
    abstract public function getWidth(); 
    abstract public function getLength(); 
}
?>
