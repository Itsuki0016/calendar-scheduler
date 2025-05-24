<?php
$env = parse_ini_file(__DIR__ . '/../local.env');
if (!$env) {
    die('❌ local.env 読み込み失敗');
}

$host = $env['DB_HOST'];
$dbname = $env['DB_NAME'];
$user = $env['DB_USER'];
$pass = $env['DB_PASS'];

var_dump($host); // ← 一度確認用に出してみる

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo '✅ 接続成功';
} catch (PDOException $e) {
    die('❌ データベース接続失敗: ' . $e->getMessage());
}

