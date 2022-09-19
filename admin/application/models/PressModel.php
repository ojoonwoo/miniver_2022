<?php
namespace application\models;

use \mysqli;

class PressModel extends Model {
    // methods ... selectList, updateItem, readItem, deleteItem,

    public function selectList($category, $idx, $pageNo) {
        $sql = 'SELECT * FROM press_info';
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

        // echo $sql;
        // exit;

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
}
?>