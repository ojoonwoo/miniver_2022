<?php
namespace application\models;

use \mysqli;

class BlogModel extends Model {
        public function insertBlog($data) {
            // $filtered_data = mysqli_real_escape_string($this->my_db, $data);

            // $sql = 'INSERT INTO blog_info (`blog_json`) VALUES('.$filtered_data.')';
            // $result = mysqli_query($this->my_db, $sql);
    
            // echo $sql;
            // exit;
    
            // return $result;
            // $json_data = json_encode($data); // Here we are encoding the data to JSON

            // Prepare an insert statement
            
            $sql = 'INSERT INTO blog_info (`blog_json`) VALUES (?)';
            $stmt = $this->my_db->are($sql);
            
            // Bind variables to the prepared statement as parameters
            // $stmt->bind_param("s", $json_data);
            $stmt->bind_param("s", $data);
            
            // Attempt to execute the prepared statement
            if($stmt->execute()){
                return true;
            } else {
                return false;
            }
        }
}
