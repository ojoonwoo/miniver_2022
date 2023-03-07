<?php

namespace application\controllers;

class PressController extends Controller
{
    private $uploader;
    
    public function index()
    {
        $model = new \application\models\PressModel();
        $list = $model->selectList();

        $page_title = "press list";

        require_once 'application/views/press/index.php';
    }

    public function add($param)
    {
        if ($param) {
            echo "비정상 접근";
            return false;
        }
        $model = new \application\models\PressModel();
        $action = "add";
        $page_title = "press add";
        require_once 'application/views/press/view.php';
    }
    public function edit($index)
    {
        if (empty($index)) {
            echo "비정상 접근";
            $url = _ROOT_URL . 'press/';
            echo "<script>location.replace('" . $url . "')</script>";
        }

        $model = new \application\models\PressModel();
        $press_data = $model->getDetail($index);
        $action = "modify";
        $page_title = "press edit";

        require_once 'application/views/press/view.php';
    }
    public function itemInsert()
    {
        if ($_SERVER['REQUEST_METHOD'] !== "POST") {
            exit();
        }


        $model = new \application\models\PressModel();

        // $this->uploader = new \application\libs\Uploader();
        // @todo : 프로젝트 폴더명 어떻게 할지 고민.
        $press_id = $model->getLastPressID() + 1;

        $pressdata = array(
            "press_title" => htmlspecialchars($_POST['press_title']),
            "press_link" => htmlspecialchars($_POST['press_link']),
            "press_date" => htmlspecialchars($_POST['press_date']),
        );


        $upload_results = $this->uploadFiles($press_id, $_FILES);

        $merge_array = array_merge($pressdata, $upload_results);


        $insert_result = $model->insertPress($merge_array);

        if ($insert_result) {
            $url = _ROOT_URL . 'press';
            echo "<script>alert('등록완료')</script>";
            echo "<script>location.replace('$url')</script>";
        } else {
            $url = _ROOT_URL . 'press/add/';
            echo "<script>alert('등록실패')</script>";
            echo "<script>location.replace('$url')</script>";
        }
    }
    private function uploadFiles($dirIndex, $files) {

        // echo "in";

        // exit;
        $this->uploader = new \application\libs\Uploader();

        $upload_results = array();
        $return_data = array();
        /*
        @todo : 1. 코드 개선 필요
        */
        foreach($_FILES as $file_dir => $file_arr) {
            $dir_add = 'press/'.$dirIndex.'/'.$file_dir.'/';
            $ok_file_arr = "";
            $file_count = count($file_arr['name']);
            for($iter = 0; $iter < $file_count; $iter++) {
                // 여기서 파일 있는지 검증
                if(isset($file_arr['name'][$iter]) && $file_arr['size'][$iter] > 0) {
                    $ok_file_arr = $file_arr;
                }
            }


            if($ok_file_arr) {
                $upload_result = $this->uploader->upload($ok_file_arr, $dir_add);
                $upload_results[$file_dir] = $upload_result;
            }
        }

        foreach($upload_results as $key => $result) {
            $result_leng = count($result);
            $filename_str = "";
            foreach($result as $iter => $val) {
                if($val['result']) {
                    if($result_leng > 1 && $result_leng-1 !== $iter) {
                        $divide = ", ";
                    } else {
                        $divide = "";
                    }
                    $filename_str .= $val['filename'].$divide;
                    $return_data[$key] = $filename_str;
                }
            }
        }

        return $return_data;

    }
    public function itemEdit($index) {
        if($_SERVER['REQUEST_METHOD'] !== "POST") {
            exit();    
        }

        if(!$index) {
            exit();
        }

        $model = new \application\models\PressModel();
        $press_visible = htmlspecialchars($_POST['press_visible']) === '노출' ? '1' : '0';
        // print_r($press_visible);
        $item_data = $model->getDetail($index);

        $pressdata = array(
            "press_title" => htmlspecialchars($_POST['press_title']),
            "press_link" => htmlspecialchars($_POST['press_link']),
            "press_date" => htmlspecialchars($_POST['press_date']),
            "press_visible" => $press_visible,
        );

        
        $upload_results = $this->uploadFiles($item_data['idx'], $_FILES);

        
        /*
        @todo : 기존 업로드 파일 삭제
        */
        $uploaded_dir = _MNV_ROOT.'uploads/press/'.$index.'/';
        $remove_results = array();
        foreach($upload_results as $key => $result) {
            $del_file_array = explode(', ', $item_data[$key]);
            foreach($del_file_array as $file) {
                $del_file = $uploaded_dir.$key.'/'.$file;
                $result = $this->removeFiles($del_file);
                array_push($remove_results, $result);
            }
        }

        // 삭제 리턴 확인 후
        // 아래 update 할 데이터 merge

        $merge_array = array_merge($pressdata, $upload_results);

        $update_result = $model->updateWork($item_data['idx'], $merge_array);

        if($update_result) {
            echo "<script>alert('수정완료')</script>";
        } else {
            echo "<script>alert('수정실패')</script>";
        }

        $url = _ROOT_URL.'press/edit/'.$index;
        echo "<script>location.replace('$url')</script>";
    }
    private function removeFiles($file) {
        if(is_file($file) && file_exists($file)) {
            // delete
            if(!unlink($file)) {
                return array('result'=> false, 'msg'=> 'unlink error');
            } else {
                return array('result'=> true);
            }
        } else {
            return array('result'=> false, 'msg'=> 'not exist file');
        }
    }
}
