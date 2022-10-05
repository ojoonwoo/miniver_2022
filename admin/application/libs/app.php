<?php
namespace application\libs;

class app {
    public $controller;
    public $action;
    public function __construct() {
        $getUrl = '';
        if (isset($_GET['url'])) {
            $getUrl = rtrim($_GET['url'], '/');
            $getUrl = filter_var($getUrl, FILTER_SANITIZE_URL);
        }
        $getParams = explode('/', $getUrl);


        $params['menu'] = isset($getParams[0]) && $getParams[0] != '' ? $getParams[0] : 'work';
        $params['action'] = isset($getParams[1]) && $getParams[1] != '' ? $getParams[1] : 'index';
        $params['category'] = isset($getParams[2]) && $getParams[2] != '' ? $getParams[2] : null;
        $params['idx'] = isset($getParams[3]) && $getParams[3] != '' ? $getParams[3] : null;
        $params['pageNum'] = isset($getParams[4]) && $getParams[4] != '' ? $getParams[4] : null;
        // if (!file_exists('application/controllers/'. $params['menu'] .'Controller.php')) {
            if (!file_exists('application/controllers/'. ucwords($params['menu']) .'Controller.php')) {
            echo "해당 컨트롤러가 존재하지 않습니다.";
            echo "Not Found";
            // not found
            exit();
        }

        // $controllerName = '\application\controllers\\'.$params['menu'].'controller';
        $controllerName = '\application\controllers\\'.ucwords($params['menu']).'Controller';
        new $controllerName($params['menu'], $params['action'], $params['category'], $params['idx'], $params['pageNum']);
        
    }
}
?>