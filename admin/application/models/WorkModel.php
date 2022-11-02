<?php
namespace application\models;

use \mysqli;

class WorkModel extends Model {
    // methods ... selectList, updateItem, readItem, deleteItem,

    public function selectList($category) {
        $where_cate = "";
        if($category) {
            $where_cate = "and work_categories LIKE '%".$category."%'";
        }
        $sql = "SELECT * FROM work_info WHERE 1 $where_cate ORDER BY work_order ASC, work_register_date DESC";
        $result = mysqli_query($this->my_db, $sql);
        $res_data = array();

        $i = 0;
        while ($row = mysqli_fetch_array($result))
        {
            // category select
            $category_array = explode(', ', $row['work_categories']);
            $category_names = [];
            foreach($category_array as $key => $cate) {
                $cate_name = $this->getCategoryName($cate);
                // $cate_sql = 'SELECT category_name FROM category_info WHERE idx = "'.$cate.'"';
                // $cate_result = mysqli_query($this->my_db, $cate_sql);
                // $data = mysqli_fetch_assoc($cate_result);
                // $category_names[$key] = $data['category_name'];
                $category_names[$key] = $cate_name;
            }
            
            $result_cate_arr = implode(', ', $category_names);
            $row['work_category_names'] = $result_cate_arr;
            $res_data[] = $row;

            $i++;
        }

        return $res_data;
    }
    public function getDetail($index) {
        $sql = 'SELECT * FROM work_info WHERE idx = "'.$index.'"';
        $result = mysqli_query($this->my_db, $sql);
        $data = mysqli_fetch_array($result);

        if($data['idx']) {
            return $data;
        } else {
            return false;
        }
    }
    public function getCategories() {
        $cate_sql = 'SELECT idx, category_name FROM category_info WHERE 1';
        $cate_result = mysqli_query($this->my_db, $cate_sql);

        $res_data = [];
        while($data = mysqli_fetch_assoc($cate_result)) {
            $res_data[] = $data;
        }
        
        return $res_data;
    }
    public function getLastWorkID() {
        $sql = 'SELECT idx FROM work_info WHERE 1 ORDER BY idx DESC LIMIT 1';
        $result = mysqli_query($this->my_db, $sql);
        $data = mysqli_fetch_assoc($result);
        $id = $data['idx'];
        return $id;
    }
    public function getCategoryName($index) {
        $cate_sql = 'SELECT category_name FROM category_info WHERE idx = "'.$index.'"';
        $cate_result = mysqli_query($this->my_db, $cate_sql);
        $data = mysqli_fetch_assoc($cate_result);

        return $data['category_name'];
    }
    public function insertWork($data) {
        // $filtered_data = array();

        $columns = "";
        $values = "";
        $column_length = count($data);
        $i = 0;
        $divide = ",";
        foreach($data as $columnkey => $value) {
            if($column_length-1 === $i) {
                $divide = "";
            }
            // $filtered_data[$columnkey] = mysqli_real_escape_string($this->my_db, $value);
            $values .= "\"".(mysqli_real_escape_string($this->my_db, $value))."\"".$divide;
            $columns .= $columnkey . $divide;
            $i++;
        }

        // echo $columns;
        // echo "<br/>";
        // echo $values;

        $sql = 'INSERT INTO work_info('.$columns.') VALUES('.$values.')';
        $result = mysqli_query($this->my_db, $sql);

        return $result;
    }
    public function updateWork($index, $data) {

        $cv_set = "";
        $column_length = count($data);
        $i = 0;
        $divide = ",";
        foreach($data as $columnkey => $value) {
            if($column_length-1 === $i) {
                $divide = "";
            }
            $escape_value = "\"".(mysqli_real_escape_string($this->my_db, $value))."\"";
            $cv_set .= $columnkey.'='.$escape_value.$divide;
            $i++;
        }
        $cv_set .= ", work_update_date= '".date('Y-m-d H:i:s')."'";

        $sql = 'UPDATE work_info SET '.$cv_set.' WHERE idx = '.$index.'';
        $result = mysqli_query($this->my_db, $sql);


        return $result;
    }
    public function listOrderUpdate($list) {
        $q_string = "";
        $idx_arr = array();
        foreach($list as $key => $val) {
            $q_string .= "WHEN idx = '".$val['idx']."' THEN '".$val['order']."' ";
            $idx_arr[$key] = $val['idx'];
        }
        $idx_string = implode(",", $idx_arr);
        
        $sql = "UPDATE work_info
            SET
            work_order = CASE
            $q_string
            END
            WHERE idx IN($idx_string)
            ";

        $result = mysqli_query($this->my_db, $sql);

        return $result;
    }
}
?>