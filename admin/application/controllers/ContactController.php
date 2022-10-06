<?php
namespace application\controllers;

class ContactController extends Controller {
    private $page_css_name = "contact";

    // 생성자 오버로딩 안됨.
    // public function __construct()
    // {
    //     $this->uploader = new \application\libs\Uploader();

    // }
    public $category_list = [];
    public function index($category, $idx, $pageNo) {
        $model = new \application\models\ContactModel();
        $list = $model->selectList($category, $idx, $pageNo);
        $this->category_list = $model->getCategories();

        $page_title = "contact list";

        require_once 'application/views/contact/index.php';
    }
    public function view($index) {
        $model = new \application\models\ContactModel();
        $contact_data = $model->getDetail($index);
        $this->category_list = $model->getCategories();
        $action = "read";
        $page_title = "contact view";
        

        require_once 'application/views/contact/view.php';
    }
    // public function edit($index) {
    //     if(empty($index)) {
    //         echo "비정상 접근";
    //         $url = _ROOT_URL.'work/';
    //         echo "<script>location.replace('".$url."')</script>";
    //     }

    //     $model = new \application\models\WorkModel();
    //     $work_data = $model->getDetail($index);
    //     $this->category_list = $model->getCategories();

    //     $action = "modify";
    //     $page_title = "work edit";
        

    //     require_once 'application/views/work/view.php';
    // }
    // public function add($param) {
    //     if($param) {
    //         echo "비정상 접근";
    //         return false;
    //     }
    //     $model = new \application\models\WorkModel();

    //     $this->category_list = $model->getCategories();
    //     $action = "add";
    //     $page_title = "work add";
    //     require_once 'application/views/work/view.php';
    // }
    // public function itemEdit($index) {
    //     if($_SERVER['REQUEST_METHOD'] !== "POST") {
    //         exit();    
    //     }

    //     if(!$index) {
    //         exit();
    //     }

    //     $model = new \application\models\WorkModel();

    //     // print_r($_POST);

    //     $work_categories = htmlspecialchars(implode(', ', $_POST['work_categories']));

    //     $item_data = $model->getDetail($index);

    //     $workdata = array(
    //         "work_title"=> htmlspecialchars($_POST['work_title']),
    //         "work_title_kor"=> htmlspecialchars($_POST['work_title_kor']),
    //         "work_categories"=> $work_categories,
    //         "client_name"=> htmlspecialchars($_POST['client_name']),
    //         "client_name_kor"=> htmlspecialchars($_POST['client_name_kor']),
    //         "work_overview"=> htmlspecialchars($_POST['work_overview']),
    //         "hero_color"=> htmlspecialchars($_POST['hero_color']),
    //     );

        
    //     $upload_results = $this->uploadFiles($item_data['idx'], $_FILES);

        
    //     /*
    //     @todo : 기존 업로드 파일 삭제
    //     */
    //     $uploaded_dir = _MNV_ROOT.'uploads/work/'.$index.'/';
    //     $remove_results = array();
    //     foreach($upload_results as $key => $result) {
    //         $del_file_array = explode(', ', $item_data[$key]);
    //         foreach($del_file_array as $file) {
    //             $del_file = $uploaded_dir.$key.'/'.$file;
    //             $result = $this->removeFiles($del_file);
    //             array_push($remove_results, $result);
    //         }
    //     }

    //     // 삭제 리턴 확인 후
    //     // 아래 update 할 데이터 merge

    //     $merge_array = array_merge($workdata, $upload_results);

    //     $update_result = $model->updateWork($item_data['idx'], $merge_array);

    //     if($update_result) {
    //         echo "<script>alert('수정완료')</script>";
    //     } else {
    //         echo "<script>alert('수정실패')</script>";
    //     }

    //     $url = _ROOT_URL.'work/edit/'.$index;
    //     echo "<script>location.replace('$url')</script>";
    // }
    
}

?>