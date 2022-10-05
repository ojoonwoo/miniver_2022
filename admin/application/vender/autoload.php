<?php
spl_autoload_register(function ($path) {
    $path = str_replace('\\','/',$path);
    $paths = explode('/', $path);
    $path2 = $paths[2];
    if (preg_match('/model/', strtolower($paths[1]))) {
        $className = 'models';
        $path2 = ucwords($path2);
    } else if (preg_match('/controller/',strtolower($paths[1]))) {
        $className = 'controllers';
        $path2 = ucwords($path2);
    } else {
        $className = 'libs';
    }
    // $loadpath = $paths[0].'/'.$className.'/'.$paths[2].'.php';
    $loadpath = $paths[0].'/'.$className.'/'.$path2.'.php';

    // echo 'autoload $path : ' . $loadpath . '<br>';
    if (!file_exists($loadpath)) {
        echo " --- autoload : file not found. ($loadpath) ";
        exit();
    }

    require_once $loadpath;
});