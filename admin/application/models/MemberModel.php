<?php
namespace application\models;

use \mysqli;

class MemberModel extends Model {

    protected function sql_password($value) {
        // mysql 4.0x 이하 버전에서는 password() 함수의 결과가 16bytes
        // mysql 4.1x 이상 버전에서는 password() 함수의 결과가 41bytes
        $query = "SELECT password('$value') as pass";
        $result = mysqli_query($this->my_db, $query);
        // $row = mysqli_fetch_array(" select password('$value') as pass ");
        $row = mysqli_fetch_array($result);

        return $row['pass'];
    }

    public function loginCheck($id, $pw) {

        // 1. 세션 체크 => 이미 로그인 상태인가?

        // 2. $id, $pw 가 정상적으로 넘어왔는가?

        // 3. $id, $pw escape

        $sql_password = $this->sql_password($pw);
        $sql = 'SELECT mb_id, mb_grade FROM member_info WHERE mb_id = "'.$id.'" AND mb_password = "'.$sql_password.'"';

        $result = mysqli_query($this->my_db, $sql);
        $data = mysqli_fetch_array($result);

        if($result) {
            // session에 id, grade 저장
            return array('mb_id'=> $data['mb_id'], 'mb_grade'=> $data['mb_grade']);
        } else {
            // 가입 필요.
            return false;
        }

        // return $res_data;
    }
}
?>