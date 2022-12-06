<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
header('Content-Type: application/json; charset=utf-8');

const API_KEY = "TSmE7UFRABhf44WaVGkqnCN2en";

$host = 'localhost';
$database = 'hcir';
$username = 'root';
$password = '';

$mysqli = mysqli_connect($host, $username, $password) or die("Can't connect to database");
mysqli_select_db($mysqli, $database) or die ("Can't select database");
mysqli_set_charset($mysqli, "utf8mb4");
