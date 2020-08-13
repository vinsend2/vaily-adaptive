<?php
include_once 'mailer.php';
if(isset($_POST['email'])) {
  $email = ["vins_and@mail.ru"]; // "a@westarp.io";

  $sender = "Confael <info@confaelshop.ru>";
  $subject = "Заявка с сайта Confael";


  $message = '
    <table>
      <tr>
        <td><b>Имя:</b></td>
        <td>'.$_POST["name"].'</td>
      <tr>
      <tr>
        <td><b>Телефон:</b></td>
        <td>'.$_POST["tel"].'</td>
      <tr>
      <tr>
        <td><b>Почта:</b></td>
        <td>'.$_POST["email"].'</td>
      <tr>
      <tr>
        <td><b>Сообщение:</b></td>
        <td>'.$_POST["message"].'</td>
      <tr>
    </table>
  ';

  Mailer::init();
  $success = Mailer::send($email, $subject, $message);
  $response = json_encode(['success' => $success]);
  echo $response;
  return $response;
}
?>
