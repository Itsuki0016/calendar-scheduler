CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    title TEXT,
    date DATE,
    deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
