<?php
// define('_ROOT', $_SERVER['DOCUMENT_ROOT']);
/*
@todo : 실서버 경로에 맞춰 분기 핋요
*/
define('_MNV_ROOT', $_SERVER['DOCUMENT_ROOT'].'/miniver-2022/');
define('_ROOT', $_SERVER['DOCUMENT_ROOT'].'/miniver-2022/admin/');
define('_VIEW_DIR', _ROOT.'application/views/');
define('_PUBLIC_URL', 'http://'.$_SERVER['HTTP_HOST'].'/miniver-2022/admin/public/');
define('_ROOT_URL', 'http://'.$_SERVER['HTTP_HOST'].'/miniver-2022/admin/');

define('_WORK_UPLOAD_URL', 'http://'.$_SERVER['HTTP_HOST'].':3000/works/');
// define('_DBTYPE', 'mysql');
define('_HOST', 'localhost');
define('_DBNAME', 'miniver_2022');
define('_DBUSER', 'root');
define('_DBPASSWORD', 'alslqj~1');
define('_CHARSET', 'utf8mb4');

session_start();
?>