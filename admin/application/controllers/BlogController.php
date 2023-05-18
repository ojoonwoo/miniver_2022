<?php

namespace application\controllers;

class BlogController extends Controller
{
    private $uploader;

    public function index()
    {
        $model = new \application\models\BlogModel();
        $list = $model->selectList();
        $page_title = "blog list";

        require_once 'application/views/blog/index.php';
    }

    public function add($param)
    {
        if ($param) {
            echo "비정상 접근";
            return false;
        }
        $model = new \application\models\BlogModel();
        $action = "add";
        $page_title = "blog add";
        require_once 'application/views/blog/view.php';
    }
    // public function edit($index)
    // {
    //     if (empty($index)) {
    //         echo "비정상 접근";
    //         $url = _ROOT_URL . 'blog/';
    //         echo "<script>location.replace('" . $url . "')</script>";
    //     }

    //     $model = new \application\models\BlogModel();
    //     $blog_data = $model->getDetail($index);
    //     $action = "modify";
    //     $page_title = "blog edit";

    //     require_once 'application/views/blog/view.php';
    // }
    public function itemInsert()
    {   
        if ($_SERVER['REQUEST_METHOD'] !== "POST") {
            exit();
        }

        $model = new \application\models\BlogModel();
        
        $json = file_get_contents('php://input');
        // $blogdata = json_decode($json);

        $data = json_decode($json, true);

        // $insert_result = $model->insertBlog($blogdata);
        $insert_result = $model->insertBlog($data);

        if ($insert_result) {
            // $url = _ROOT_URL . 'blog';
            // echo "<script>alert('등록완료')</script>";
            // echo "<script>location.replace('$url')</script>";
            echo $insert_result;
        } else {
            // $url = _ROOT_URL . 'blog/add/';
            // echo "<script>alert('등록실패')</script>";
            // echo "<script>location.replace('$url')</script>";
            echo $insert_result;
        }
    }
}
