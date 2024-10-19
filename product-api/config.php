<?php
$host = 'sql310.infinityfree.com';
$db_name = 'if0_37538183_products_db';
$username = 'if0_37538183';
$password = 'xv56p97n';

try {
    $db = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection Error: ' . $e->getMessage();
}
?>
