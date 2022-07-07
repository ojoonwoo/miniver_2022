<?php

namespace application\models;

use \mysqli;

class Model {
    public $my_db;

    public function __construct()
    {
        // db connect
        $this->my_db = new mysqli(_HOST, _DBUSER, _DBPASSWORD, _DBNAME);

        if (mysqli_connect_error()) {
            exit('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
        }

        mysqli_query($this->my_db, "set names "._CHARSET);
    }
}

?>