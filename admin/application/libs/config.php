<?php
// define('_ROOT', $_SERVER['DOCUMENT_ROOT']);
/*
@todo : 실서버 경로에 맞춰 분기 핋요
*/
if(_SERVICE_ENV === 'DEV') {

    define('_MNV_ROOT', $_SERVER['DOCUMENT_ROOT'].'/miniver_2022/');
    define('_ROOT', $_SERVER['DOCUMENT_ROOT'].'/miniver_2022/admin/');
    define('_VIEW_DIR', _ROOT.'application/views/');
    define('_PUBLIC_URL', 'http://'.$_SERVER['HTTP_HOST'].'/miniver_2022/admin/public/');
    define('_ROOT_URL', 'http://'.$_SERVER['HTTP_HOST'].'/miniver_2022/admin/');

    define('_WORK_UPLOAD_URL', 'http://'.$_SERVER['HTTP_HOST'].':3000/works/');
    define('_WORK_UPLOAD_DIR', _MNV_ROOT.'uploads/work/');
    define('_PRESS_UPLOAD_URL', 'http://'.$_SERVER['HTTP_HOST'].':3000/journalists/');
    define('_PRESS_UPLOAD_DIR', _MNV_ROOT.'uploads/press/');
    define('_BLOG_UPLOAD_URL', 'http://'.$_SERVER['HTTP_HOST'].':3000/postings/');
    define('_BLOG_UPLOAD_DIR', _MNV_ROOT.'uploads/blog/');
} else {
    define('_MNV_ROOT', '/var/www/html/miniver_2022/');
    define('_ROOT', $_SERVER['DOCUMENT_ROOT'].'/');
    define('_VIEW_DIR', _ROOT.'application/views/');
    define('_PUBLIC_URL', 'http://'.$_SERVER['HTTP_HOST'].'/public/');
    define('_ROOT_URL', 'http://'.$_SERVER['HTTP_HOST'].'/');

    define('_WORK_UPLOAD_URL', 'https://minivertising.kr/works/');
    define('_WORK_UPLOAD_DIR', _MNV_ROOT.'uploads/work/');
    define('_PRESS_UPLOAD_URL', 'https://minivertising.kr/journalists/');
    define('_PRESS_UPLOAD_DIR', _MNV_ROOT.'uploads/press/');
    define('_BLOG_UPLOAD_URL', 'https://minivertising.kr/postings/');
    define('_BLOG_UPLOAD_DIR', _MNV_ROOT.'uploads/blog/');
}
define('_BASE_UPLOAD_DIR', _MNV_ROOT.'uploads/');



session_start();
?>