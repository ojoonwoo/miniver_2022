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
        $blog_id = $model->getLastBlogID();
        // ! 임시 코드
        if (!$blog_id) {
            $blog_id = 1;
        }

        $json = file_get_contents('php://input');
        // $blogdata = json_decode($json);

        $data = json_decode($json, true);
        $imageData = $data['imageData'];
        // print_r($imageData);

        // base 64인 파일 저장
        foreach ($imageData as $key => &$value) {
            // print_r($value['data']['url']);
            $imageDataUrl = $value['data']['url'];
            $parts = explode('base64,', $imageDataUrl);
            if (count($parts) > 1) {
                $base64_image_str = $parts[1]; // 'base64,' 이후 부분
                $imageDataUrl = $base64_image_str;
                $imageDataUrl = str_replace(' ', '+', $imageDataUrl);
                $imageDataUrl = base64_decode($imageDataUrl);
                // echo $imageDataUrl;
                $file_save_object = $this->save_image($imageDataUrl, $blog_id);
                if ($file_save_object['url']) {
                    $value['data']['url'] = $file_save_object['url'];
                } else {
                    echo "file_save_object error";
                }
            } else {
                echo "The string does not contain 'base64,'";
            }
        }

        // 에디터 데이터와 이미지 데이터의 ID 값 매칭을 위해 변환
        $imageDataMapped = [];
        foreach ($imageData as $item) {
            $imageDataMapped[$item['id']] = $item;
        }

        // 이제 array1에서 각 블록을 순회하면서 ID가 일치하는 imageData의 항목을 찾습니다.
        foreach ($data['editorData']['blocks'] as &$block1) {
            if (isset($imageDataMapped[$block1['id']])) {
                // ID가 일치하는 항목이 imageData에 있다면, URL을 대체합니다.
                $block1['data']['url'] = $imageDataMapped[$block1['id']]['data']['url'];
            }
        }

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
    private function save_image($image, $blog_id)
    {
        $return_object = array();
        if ($_SERVER['HTTP_HOST'] == 'www.royalcaninevent2020.com' || $_SERVER['HTTP_HOST'] == 'royalcaninevent2020.com') {
            $uploads_dir = "/storage_data/breed23/uploads/" . $blog_id . "/";
        } else {
            $uploads_dir = _BASE_UPLOAD_DIR . "blog/" . $blog_id . "/";
        }

        if (!is_dir($uploads_dir)) {
            mkdir($uploads_dir);
            chmod($uploads_dir, 0777);
        }


        $filename = $this->make_filename();
        $dest = $uploads_dir . $filename . '.png';
        $success = file_put_contents($dest, $image);

        if ($success) {
            $return_object['url'] = _BLOG_UPLOAD_URL . $blog_id . "/" . $filename . '.png';
        } else {
            $return_object['error'] = "Y";
        }

        return $return_object;
    }
    private function make_filename()
    {
        return md5(uniqid(rand(), true));
    }
    public function itemEdit($blog_id) {
        if ($_SERVER['REQUEST_METHOD'] !== "POST") {
            exit();
        }

        $model = new \application\models\BlogModel();
    }
}
