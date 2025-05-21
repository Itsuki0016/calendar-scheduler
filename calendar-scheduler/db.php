<?php
$host = 'mysql80.blackbathroom.sakura.ne.jp';     // さくらのDBホスト名（コントロールパネルで確認）
$dbname = 'blackbathroom_calendar';               // 例: yourname_db（コントロールパネルで確認）
$user = 'blackbathroom';                    // DBユーザー名（通常、接頭にユーザーIDが付く）
$pass = 'blackbathroom05';                   // 設定したパスワード

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ 接続成功！";
} catch (PDOException $e) {
    echo "❌ 接続失敗: " . $e->getMessage();
}
