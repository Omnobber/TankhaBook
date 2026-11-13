<?php
/**
 * TankhaBook – contact.php
 * Handles enquiry form: saves to MySQL + sends email
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// ============ CONFIG ============
define('DB_HOST', 'localhost');
define('DB_NAME', 'tankhabook_db');   // Change to your DB name
define('DB_USER', 'root');             // Change to your DB user
define('DB_PASS', '');                 // Change to your DB password
define('NOTIFY_EMAIL', 'support@tankhabook.com');
define('SITE_NAME', 'TankhaBook');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// ============ SANITIZE INPUT ============
function clean($val) {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['name']    ?? '');
$phone   = clean($_POST['phone']   ?? '');
$message = clean($_POST['message'] ?? '');

// ============ VALIDATE ============
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Name must be at least 2 characters.';
}
if (!preg_match('/^[6-9]\d{9}$/', $phone)) {
    $errors[] = 'Please provide a valid 10-digit Indian mobile number.';
}
if (!empty($errors)) {
    echo json_encode(['status' => 'error', 'message' => implode(' ', $errors)]);
    exit;
}

// ============ SAVE TO DATABASE ============
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    // Create table if not exists
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS enquiries (
            id         INT AUTO_INCREMENT PRIMARY KEY,
            name       VARCHAR(120)  NOT NULL,
            phone      VARCHAR(15)   NOT NULL,
            message    TEXT,
            ip_address VARCHAR(45),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $stmt = $pdo->prepare("
        INSERT INTO enquiries (name, phone, message, ip_address)
        VALUES (:name, :phone, :message, :ip)
    ");
    $stmt->execute([
        ':name'    => $name,
        ':phone'   => $phone,
        ':message' => $message,
        ':ip'      => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    $savedToDb = true;
} catch (PDOException $e) {
    // DB failed – still send email
    $savedToDb = false;
    error_log('[TankhaBook] DB Error: ' . $e->getMessage());
}

// ============ SEND EMAIL ============
$subject = SITE_NAME . ' – New Enquiry from ' . $name;
$body = "
New enquiry received on " . SITE_NAME . "

Name    : {$name}
Phone   : {$phone}
Message : {$message}

Time    : " . date('d M Y, h:i A') . "
IP      : " . ($_SERVER['REMOTE_ADDR'] ?? 'N/A') . "
";

$headers  = "From: noreply@tankhabook.com\r\n";
$headers .= "Reply-To: {$name} <noreply@tankhabook.com>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

@mail(NOTIFY_EMAIL, $subject, $body, $headers);

// ============ RESPONSE ============
echo json_encode([
    'status'  => 'success',
    'message' => 'Enquiry received! We will contact you within 24 hours.',
    'saved'   => $savedToDb,
]);
exit;
?>
