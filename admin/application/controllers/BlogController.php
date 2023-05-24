<?php

namespace application\controllers;

use function PHPSTORM_META\map;

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
        $blog_id = $blog_id ?: 1;

        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $imageData = $data['imageData'];

        $imageDataMapped = $this->decodeImageUrls($data, $imageData, $blog_id);

        $insert_result = $model->insertBlog($imageDataMapped);

        if ($insert_result) {
            // $url = _ROOT_URL . 'blog';
            // echo "<script>alert('등록완료')</script>";
            // echo "<script>location.replace('$url')</script>";
            // echo $insert_result;
            echo "insert success";
        } else {
            // $url = _ROOT_URL . 'blog/add/';
            // echo "<script>alert('등록실패')</script>";
            // echo "<script>location.replace('$url')</script>";
            // echo $insert_result;
            echo "insert fail";
        }
    }
    private function decodeImageUrls($data, $imageData, $blog_id)
    {
        $imageDataMapped = [];

        foreach ($imageData as $key => &$value) {
            $parts = explode('base64,', $value['data']['url']);

            // If the string does not contain 'base64,', simply skip this iteration
            if (count($parts) <= 1) {
                continue;
            }

            $base64_image_str = $parts[1]; // Get the part after 'base64,'
            $decodedImage = base64_decode(str_replace(' ', '+', $base64_image_str));
            $file_save_object = $this->save_image($decodedImage, $blog_id, $value['id']);

            if ($file_save_object['url']) {
                $value['data']['url'] = $file_save_object['url'];
                $imageDataMapped[$value['id']] = $value;
            }
        }

        // 이제 $data['editorData']의 각 blocks들을 순회하면서 ID가 일치하는 imageData의 항목을 찾습니다.
        foreach ($data['editorData']['blocks'] as &$block) {
            if (isset($imageDataMapped[$block['id']])) {
                // ID가 일치하는 항목이 imageData에 있다면, URL을 대체합니다.
                $block['data']['url'] = $imageDataMapped[$block['id']]['data']['url'];
            }
        }

        return $data;
    }
    private function save_image($image, $blog_id, $filename)
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


        // $filename = $this->make_filename();
        $dest = $uploads_dir . $filename . '.png';
        $success = file_put_contents($dest, $image);

        if ($success) {
            $return_object['url'] = _BLOG_UPLOAD_URL . $blog_id . "/" . $filename . '.png';
        } else {
            $return_object['error'] = "Y";
        }

        return $return_object;
    }
    // private function make_filename()
    // {
    //     return md5(uniqid(rand(), true));
    // }
    public function itemEdit($blog_id)
    {
        if ($_SERVER['REQUEST_METHOD'] !== "POST") {
            exit();
        }

        $model = new \application\models\BlogModel();
        $blog_id = $blog_id;

        $origin_data = $model->getDetail($blog_id);
        $origin_json = $origin_data['blog_json'];
        $origin_editor_data = json_decode($origin_json, true);

        $origin_image_ids = [];
        foreach ($origin_editor_data['blocks'] as $block) {
            if ($block['type'] === 'image') {
                $origin_image_ids[] = $block['id'];
            }
        }

        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $imageData = $data['imageData'];

        $imageDataMapped = $this->decodeImageUrls($data, $imageData, $blog_id);

        // TODO: 업데이트시 없어진 사진들 uploads폴더에서 삭제해야함
        // TODO: edit하기전의 원본 DB 정보를 불러와서 변수에 저장
        // TODO: edit데이터와 원본 DB 정보의 image들을 비교해 없는 image의 파일명 삭제용 배열에 삽입  
        // TODO: 배열을 돌면서 이미지 삭제 함수 실행
        // TODO: 그 후 업데이트 sql 요청해서 DB 업데이트

        $editor_data_ids = array_column($imageDataMapped['editorData']['blocks'], 'id');
        $delete_image_ids = array_diff($origin_image_ids, $editor_data_ids);

        foreach ($delete_image_ids as $value) {
            $delete_image = $this-> delete_image($blog_id, $value);
        }


        $insert_result = $model->updateBlog($blog_id, $imageDataMapped);
        if ($insert_result) {
            // $url = _ROOT_URL . 'blog';
            // echo "<script>alert('수정완료')</script>";
            // echo "<script>location.replace('$url')</script>";
            // echo "성공";
            echo "update success";
        } else {
            // $url = _ROOT_URL . 'blog/edit/'.$blog_id;
            // echo "<script>alert('수정실패')</script>";
            // echo "<script>location.replace('$url')</script>";
            // echo $insert_result;
            // echo "실패";
            echo "update fail";
        }
    }
    private function delete_image($blog_id, $filename)
    {
        if ($_SERVER['HTTP_HOST'] == 'www.royalcaninevent2020.com' || $_SERVER['HTTP_HOST'] == 'royalcaninevent2020.com') {
            $uploads_dir = "/storage_data/breed23/uploads/" . $blog_id . "/";
        } else {
            $uploads_dir = _BASE_UPLOAD_DIR . "blog/" . $blog_id . "/";
        }
        $dest = $uploads_dir . $filename . '.png';
        unlink($dest);
    }
}
