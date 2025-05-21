<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'IDが指定されていません']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM events WHERE id = :id");
        $stmt->execute([':id' => $id]);
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => '削除に失敗しました: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => '不正なアクセス方法です']);
} ?>
