<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>日程調整カレンダー</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.css" rel="stylesheet">
    <link href="./assets/style.css" rel="stylesheet">
</head>
<body class="p-3">

    <div class="container">
        <h1 class="text-center mb-4 display-6">📅 日程調整カレンダー</h1>
        <div id="calendar" class="mb-5"></div>
    </div>

    <!-- モーダル（予定追加） -->
    <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <form method="POST" action="submit.php" class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="eventModalLabel">予定を追加</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="date" id="eventDate">
                    <div class="mb-2">
                        <label for="username" class="form-label">名前</label>
                        <input type="text" name="username" class="form-control" required>
                    </div>
                    <div class="mb-2">
                        <label for="title" class="form-label">予定内容</label>
                        <input type="text" name="title" class="form-control" required>
                    </div>
                    <div class="mb-2">
                        <label for="deadline" class="form-label">締切（任意）</label>
                        <input type="date" name="deadline" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">追加</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">キャンセル</button>
                </div>
            </form>
        </div>
    </div>

    <!-- JS読み込み -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js"></script>
    <script src="./assets/calendar.js"></script>
</body>
</html>
