<?php

namespace application\models;

use \mysqli;

class BlogModel extends Model
{
    public function insertBlog($data)
    {
        // $filtered_data = mysqli_real_escape_string($this->my_db, $data);

        // $sql = 'INSERT INTO blog_info (`blog_json`) VALUES('.$filtered_data.')';
        // $result = mysqli_query($this->my_db, $sql);
        $editorData = $data['editorData'];
        $additionalData = $data['additionalData'];

        $additionalData_title = $additionalData['title'];
        $additionalData_writer = $additionalData['writer'];
        $additionalData_color = $additionalData['color'];

        $json_editorData = json_encode($editorData);

        // print_r($additionalData['title']);
        // exit;

        // return $result;
        // $json_data = json_encode($data); // Here we are encoding the data to JSON

        // Prepare an insert statement

        $sql = 'INSERT INTO blog_info (`blog_title`, `blog_writer`, `blog_color`, `blog_json`) VALUES (?, ?, ?, ?)';
        $stmt = $this->my_db->prepare($sql);

        // Bind variables to the prepared statement as parameters
        // $stmt->bind_param("s", $json_data);
        $stmt->bind_param("ssss", $additionalData_title, $additionalData_writer, $additionalData_color, $json_editorData);

        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function updateBlog($index, $data)
    {
        $editorData = $data['editorData'];
        $additionalData = $data['additionalData'];

        $additionalData_title = $additionalData['title'];
        $additionalData_writer = $additionalData['writer'];
        $json_editorData = json_encode($editorData);
        $additionalData_visible = $additionalData['visible'];

        $sql = 'UPDATE blog_info SET idx=?, blog_title=?, blog_writer=?, blog_json=?, blog_visible=?, blog_update_date=?';

        $stmt = $this->my_db->prepare($sql);

        // Bind variables to the prepared statement as parameters
        // $stmt->bind_param("s", $json_data);
        $stmt->bind_param("isssis", $index, $additionalData_title, $additionalData_writer, $json_editorData, $additionalData_visible, date('Y-m-d H:i:s'));

        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function selectList()
    {
        $sql = 'SELECT * FROM blog_info WHERE 1';
        $result = mysqli_query($this->my_db, $sql);

        $list = [];
        while($data = mysqli_fetch_assoc($result)) {
            $list[] = $data;
        }

        return $list;
    }

    public function getDetail($index)
    {
        $sql = 'SELECT * FROM blog_info WHERE idx = "' . $index . '"';
        $result = mysqli_query($this->my_db, $sql);
        $data = mysqli_fetch_array($result);

        if ($data['idx']) {
            return $data;
        } else {
            return false;
        }
    }
    public function getLastBlogID()
    {
        $sql = 'SHOW TABLE STATUS LIKE "blog_info"';
        $result = mysqli_query($this->my_db, $sql);
        $data = mysqli_fetch_assoc($result);
        // $id = $data['idx'];
        $id = $data['Auto_increment'];
        return $id;
    }
    public function getPreviousItemColor() {
        $sql = 'SELECT blog_color FROM blog_info WHERE 1 ORDER BY idx DESC LIMIT 1';
        $result = mysqli_query($this->my_db, $sql);
        $data = mysqli_fetch_array($result);

        if ($data['blog_color']) {
            return $data['blog_color'];
        } else {
            return false;
        }
    }
}
