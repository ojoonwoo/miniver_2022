<?php
namespace application\controllers;

class PressController extends Controller {
    public function index() {
        $model = new \application\models\PressModel();
        $page_title = "press list";

        require_once 'application/views/press/index.php';
    }
}
