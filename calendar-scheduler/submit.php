<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $title = trim($_POST['title'] ?? '');
    $date = $_POST['date'] ?? '';
    $deadline = $_POST['deadline'] ?? null;

    // 入力チェック
    if ($username === '' || $title === '' || $date === '') {
        die('入力エラー：すべての必須項目を入力してください。');
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO events (username, title, date, deadline)
            VALUES (:username, :title, :date, :deadline)
        ");
        $stmt->execute([
            ':username' => $username,
            ':title' => $title,
            ':date' => $date,
            ':deadline' => $deadline ?: null  // 空ならNULLで保存
        ]);

        // 登録後、indexに戻る
        header('Location: index.php');
        exit;
    } catch (PDOException $e) {
        die('登録に失敗しました: ' . $e->getMessage());
    }
} else {
    die('不正なアクセスです。');
}
?>