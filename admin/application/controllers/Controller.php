<?php
namespace application\controllers;

class Controller {
    public function __construct($menu, $action, $category, $idx, $pageNo) {
        $menu = ucwords($menu);
        if (!file_exists(_ROOT.'/application/models/'.$menu.'Model.php')) {
            var_dump('Model Class not found.(application/models/'.$menu.'Model.php)');
            exit();
        }

        // 로그인 체크 훅으로 만들것.
        if($menu !== 'member' && $action !== 'login') {
            if($_SESSION['mb_id'] != 'administrator' && $_SESSION['mb_grade'] != '99') {
                echo "<script>alert('로그인해주세요');</script>";
                echo "<script>location.replace('"._ROOT_URL.'member/login'."');</script>";
                exit();
            }
        }

        
        $this->$action($category, $idx, $pageNo);
    }
}