<?php
$host = 'sql310.infinityfree.com';
$db_name = 'if0_37538183_products_db';
$username = 'if0_37538183';
$password = 'xv56p97n';

try {
    $db = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    file_put_contents('db_error_log.txt', $e->getMessage(), FILE_APPEND);
    echo 'Connection Error. Check log for details.';
}
?>
