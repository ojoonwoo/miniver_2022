<?php
namespace application\controllers;

class MemberController extends Controller {
    private $page_css_name = "member";
    public function index() {
        // return 404 OR login으로 리다이렉션
        echo "404 Not Found";
        return false;
    }

    // 현재 미사용
    public function isLogin() {
        // 세션 비교
        $data = array(
            'isLogin'=>  false
        );
        
        $str = json_encode($data);

        echo $str;
    }
    public function login() {
        // session check
        // 1. 세션 체크 => 이미 로그인 상태인가?
        $page_title = "login";
        require_once 'application/views/member/login/login_form.php';
    }
    public function logout() {
        $_SESSION['mb_id'] = null;
        $_SESSION['mb_grade'] = null;
        $url = _ROOT_URL.'member/login';
        echo "<script>alert('로그아웃 되었습니다.')</script>";
        echo "<script>location.replace('$url')</script>";
        
    }
    public function loginCheck() {

        if($_SERVER['REQUEST_METHOD'] !== "POST") {
            exit();    
        }
        
        // 1. 세션 체크 => 이미 로그인 상태인가?

        // 2. $id, $pw 가 정상적으로 넘어왔는가?

        // 3. $id, $pw escape
        $id = $_POST['mb_id'];
        $password = $_POST['mb_pw'];
        $model = new \application\models\MemberModel();

        $result = $model->loginCheck($id, $password);

        if($result['mb_id']) {
            $_SESSION['mb_id'] = $result['mb_id'];
            $_SESSION['mb_grade'] = $result['mb_grade'];
            $url = _ROOT_URL.'work';
            echo "<script>alert('로그인되었습니다.')</script>";
            echo "<script>location.replace('$url')</script>";
        } else {
            $url = _ROOT_URL.'member/login';
            echo "<script>alert('로그인 실패.')</script>";
            echo "<script>location.replace('$url')</script>";
        }
        
    }
}

?>