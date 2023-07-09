<?php
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = 'nicklashn@hotmail.com';
    $subject = 'New message from your portfolio site';
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    $body = "You have received a new message from your contact form.\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message\n";

    if(mail($to, $subject, $body, $headers)) {
        $_SESSION['message'] = "Email has been sent";
        header('Location: index.html');
    } else {
        echo 'Sorry, an error occurred. Please try again later.';
    }
}
?>
