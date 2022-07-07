<!DOCTYPE html>
<?php
// 초기 로그인 검증
// if($page_title != 'login') {
//     if($_SESSION['mb_id'] != 'administrator' && $_SESSION['mb_grade'] != '99') {
//         echo "<script>alert('로그인해주세요');</script>";
//         echo "<script>location.replace("._ROOT_URL.'member/login'.");</script>";
//     }
// }


if($page_title == '') {
    $pg_title = "MINIVERTISING";
} else {
    $pg_title = $page_title;
}
?>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?=_PUBLIC_URL?>lib/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?=_PUBLIC_URL?>css/app.css">
    <?php
    if($this->page_css_name) {
    ?>
        <link rel="stylesheet" href="<?=_PUBLIC_URL?>css/<?=$this->page_css_name?>.css">
    <?php
    }
    ?>
    <script src="<?=_PUBLIC_URL?>lib/jquery-3.3.1.min.js"></script>
    <title><?php echo $pg_title ?></title>
</head>
<body>
    