<?php
namespace application\controllers;

class WorkController extends Controller {
    private $page_css_name = "work";
    private $uploader;

    // 생성자 오버로딩 안됨.
    // public function __construct()
    // {
    //     $this->uploader = new \application\libs\Uploader();

    // }
    public $category_list = [];
    public function index() {
        $category = $_GET['cate'];
        $model = new \application\models\WorkModel();
        // $list = $model->selectList($category);
        $list = $this->getWorkList($category);

        $this->category_list = $model->getCategories();

        $page_title = "work list";

        require_once 'application/views/work/index.php';
    }
    public function view($index) {
        $model = new \application\models\WorkModel();
        $work_data = $model->getDetail($index);
        $list = $this->getWorkList('');
        $this->category_list = $model->getCategories();
        $action = "read";
        $page_title = "work view";


        require_once 'application/views/work/view.php';
    }
    public function edit($index) {
        if(empty($index)) {
            echo "비정상 접근";
            $url = _ROOT_URL.'work/';
            echo "<script>location.replace('".$url."')</script>";
        }
        
        $model = new \application\models\WorkModel();
        $work_data = $model->getDetail($index);
        $list = $this->getWorkList('');
        $this->category_list = $model->getCategories();

        $action = "modify";
        $page_title = "work edit";

        require_once 'application/views/work/view.php';
    }
    public function add($param) {
        if($param) {
            echo "비정상 접근";
            return false;
        }
        $model = new \application\models\WorkModel();
        $list = $this->getWorkList('');
        $this->category_list = $model->getCategories();

        $action = "add";
        $page_title = "work add";
        require_once 'application/views/work/view.php';
    }
    public function getWorkList($category) {
        $model = new \application\models\WorkModel();

        $list = $model->selectList($category);

        return $list;
    }
    private function uploadFiles($dirIndex, $files) {

        $this->uploader = new \application\libs\Uploader();

        $upload_results = array();
        $return_data = array();
        /*
        @todo : 1. 코드 개선 필요
        */
        foreach($_FILES as $file_dir => $file_arr) {
            $dir_add = 'work/'.$dirIndex.'/'.$file_dir.'/';
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
    public function itemInsert() {
        if($_SERVER['REQUEST_METHOD'] !== "POST") {
            exit();    
        }

        $model = new \application\models\WorkModel();

        $this->uploader = new \application\libs\Uploader();
        
        $work_categories = htmlspecialchars(implode(', ', $_POST['work_categories']));

        // @todo : 프로젝트 폴더명 어떻게 할지 고민.
        $project_id = $model->getLastWorkID()+1;

        
        $workdata = array(
            "work_title"=> htmlspecialchars($_POST['work_title']),
            "work_title_kor"=> htmlspecialchars($_POST['work_title_kor']),
            "work_categories"=> $work_categories,
            "client_name"=> htmlspecialchars($_POST['client_name']),
            "client_name_kor"=> htmlspecialchars($_POST['client_name_kor']),
            "work_overview"=> htmlspecialchars($_POST['work_overview']),
            "hero_color"=> htmlspecialchars($_POST['hero_color']),
            "related_work"=> htmlspecialchars($_POST['selected_related_work']),
        );


        $upload_results = $this->uploadFiles($project_id, $_FILES);


        $merge_array = array_merge($workdata, $upload_results);


        $insert_result = $model->insertWork($merge_array);

        if($insert_result) {
            $url = _ROOT_URL.'work';
            echo "<script>alert('등록완료')</script>";
            echo "<script>location.replace('$url')</script>";
        } else {
            $url = _ROOT_URL.'work/add/';
            echo "<script>alert('등록실패')</script>";
            echo "<script>location.replace('$url')</script>";
        }
    }
    public function itemEdit($index) {
        if($_SERVER['REQUEST_METHOD'] !== "POST") {
            exit();    
        }

        if(!$index) {
            exit();
        }

        $model = new \application\models\WorkModel();

        // print_r($_POST);

        $work_categories = htmlspecialchars(implode(', ', $_POST['work_categories']));

        $item_data = $model->getDetail($index);

        $workdata = array(
            "work_title"=> htmlspecialchars($_POST['work_title']),
            "work_title_kor"=> htmlspecialchars($_POST['work_title_kor']),
            "work_categories"=> $work_categories,
            "client_name"=> htmlspecialchars($_POST['client_name']),
            "client_name_kor"=> htmlspecialchars($_POST['client_name_kor']),
            "work_overview"=> htmlspecialchars($_POST['work_overview']),
            "hero_color"=> htmlspecialchars($_POST['hero_color']),
            "related_work"=> htmlspecialchars($_POST['selected_related_work']),
        );

        
        $upload_results = $this->uploadFiles($item_data['idx'], $_FILES);

        
        /*
        @todo : 기존 업로드 파일 삭제
        */
        $uploaded_dir = _MNV_ROOT.'uploads/work/'.$index.'/';
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

        $merge_array = array_merge($workdata, $upload_results);

        $update_result = $model->updateWork($item_data['idx'], $merge_array);

        if($update_result) {
            echo "<script>alert('수정완료')</script>";
        } else {
            echo "<script>alert('수정실패')</script>";
        }

        $url = _ROOT_URL.'work/edit/'.$index;
        echo "<script>location.replace('$url')</script>";
    }
    public function workOrderUpdate() {
        if($_SERVER['REQUEST_METHOD'] !== "POST") {
            exit();    
        }

        $list_data = $_POST['list'];

        $model = new \application\models\WorkModel();

        $result = $model->listOrderUpdate($list_data);


        if($result) {
            echo json_encode(array('result' => true), JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(array('result' => false), JSON_UNESCAPED_UNICODE);
        }
    }
}

?>