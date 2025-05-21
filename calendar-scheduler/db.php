<?php
$host = 'mysql3108.db.sakura.ne.jp';     // さくらのDBホスト名（コントロールパネルで確認）
$dbname = 'blackbathroom_db';               // 例: yourname_db（コントロールパネルで確認）
$user = 'blackbathroom_calrendar';                    // DBユーザー名（通常、接頭にユーザーIDが付く）
$pass = 'blackbathroom05';                   // 設定したパスワード

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('データベース接続失敗: ' . $e->getMessage());
}
