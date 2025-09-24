<?php

$servername= "localhost";
$name = 'root';
$password = '';
$db_name = 'urbn_db';

$conn = new mysqli($servername, $name, $password, $db_name);
if($conn-> connect_error){
    die("Connection failed".$conn-> connect_error);
}
echo "Connection success";

?>