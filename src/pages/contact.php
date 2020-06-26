<?php
$name = $_POST['name'];
$Email = $_POST['email'];
$message = $_POST['message'];

$email_from = "quiz_game";
$email_subject = "New form submission"
$email_body = "Username: $name.\n".
"User Email: $Email.\n".   
"Message: $message.\n";

$to = "miszpiotr@wp.pl";
$headers = "From: $email_from \r\n";
$headers = "Reply-to: $Email \r\n";
mail($to,$email_subject,$email_body,$headers);
header("location: contact.html");
?>