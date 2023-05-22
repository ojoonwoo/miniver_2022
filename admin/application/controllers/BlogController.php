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
    public function edit($index)
    {
        if (empty($index)) {
            echo "비정상 접근";
            $url = _ROOT_URL . 'blog/';
            echo "<script>location.replace('" . $url . "')</script>";
        }

        $model = new \application\models\BlogModel();
        $blog_data = $model->getDetail($index);
        $action = "modify";
        $page_title = "blog edit";

        require_once 'application/views/blog/view.php';
    }
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
    public function imageUpload()
    {
        if ($_SERVER['REQUEST_METHOD'] !== "POST") {
            exit();
        }

        $model = new \application\models\BlogModel();
        $blog_id = $model->getLastBlogID();

        $this->uploader = new \application\libs\Uploader();

        // print_r($_FILES);
        // exit;
        $upload_results = $this->uploadFiles($blog_id, $_FILES);

        // $insert_result = $model->insertBlogImage($upload_results);
    }
    private function uploadFiles($dirIndex, $files)
    {

        $this->uploader = new \application\libs\Uploader();

        $upload_results = array();
        $return_data = array();
        /*
        @todo : 1. 코드 개선 필요
        */

        // print_r($_FILES['file']);

        // foreach ($_FILES as $file_dir => $file_arr) {
        //     $dir_add = 'blog/' . $dirIndex . '/' . $file_dir . '/';
        //     $ok_file_arr = "";
        //     if (isset($file_arr['name']) && $file_arr['size'] > 0) {
        //         $ok_file_arr = $file_arr;
        //     }
        //     print_r($ok_file_arr);
        //     // if ($ok_file_arr) {
        //     //     // $upload_result = $this->uploader->upload($ok_file_arr, $dir_add);
        //     //     $upload_result = $this->uploader->upload($_FILES, $dir_add);
        //     //     print_r($upload_result);
        //     //     exit;
        //     //     $upload_results[$file_dir] = $upload_result;
        //     // }
        // }

        $dir_add = 'blog/' . $dirIndex . '/';
        // $upload_result = $this->uploader->uploadFile($_FILES['file'], $dir_add);
        $upload_result = $this->uploader->upload($_FILES['file'], $dir_add);
        print_r($upload_result);
        exit;
        // $upload_results[$file_dir] = $upload_result;

        
        foreach ($_FILES as $file_dir => $file_arr) {
            $dir_add = 'blog/' . $dirIndex . '/' . $file_dir . '/';
            $ok_file_arr = array(
                "name" => array($file_arr['name']),
                "type" => array($file_arr['type']),
                "tmp_name" => array($file_arr['tmp_name']),
                "error" => array($file_arr['error']),
                "size" => array($file_arr['size'])
            );
            if ($ok_file_arr) {
                // $upload_result = $this->uploader->upload($ok_file_arr, $dir_add);
                $upload_result = $this->uploader->upload($_FILES, $dir_add);
                print_r($upload_result);
                exit;
                $upload_results[$file_dir] = $upload_result;
            }
        }

        foreach ($upload_results as $key => $result) {
            $result_leng = count($result);
            $filename_str = "";
            foreach ($result as $iter => $val) {
                if ($val['result']) {
                    if ($result_leng > 1 && $result_leng - 1 !== $iter) {
                        $divide = ", ";
                    } else {
                        $divide = "";
                    }
                    $filename_str .= $val['filename'] . $divide;
                    $return_data[$key] = $filename_str;
                }
            }
        }

        return $return_data;
    }
}
