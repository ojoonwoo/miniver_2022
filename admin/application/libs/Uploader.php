<?php
namespace application\libs;

class Uploader {

    const UPLOAD_DIR = _MNV_ROOT.'uploads/';
    const UPLOAD_DIR_ACCESS_MODE = 0777;
    const UPLOAD_MAX_FILE_SIZE = 10485760;
    const UPLOAD_ALLOWED_MIME_TYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'video/mp4',
    ];

    private $dir_add = "";

    public function __construct() {

    }

    /**
     * Upload the files list.
     *
     * @param array $files (optional) Files list - as received from $_FILES variable.
     * @return bool|string[] TRUE on success, or a list of errors on failure.
     */
    public function upload(array $files = [], $dir_add) {

        // Normalize the files list.
        $this->dir_add = $dir_add;
        $normalizedFiles = $this->normalizeFiles($files);

        $uploadResults = array();
        // $uploadResult = "";
        // Upload each file.
        foreach ($normalizedFiles as $key => $normalizedFile) {

            $uploadResult = $this->uploadFile($normalizedFile);

            if ($uploadResult['result'] !== TRUE) {
                $errors[] = $uploadResult;
            } else {
                array_push($uploadResults, $uploadResult);
            }
        }

        // Return TRUE on success, or the errors list on failure.
        // return empty($errors) ? TRUE : $errors;
        return empty($errors) ? $uploadResults : $errors;
    }

     /**
     * Normalize the files list.
     *
     * @link https://www.php-fig.org/psr/psr-7/#16-uploaded-files PSR-7: 1.6 Uploaded files.
     *
     * @param array $files (optional) Files list - as received from $_FILES variable.
     * @return array Normalized files list.
     */
    private function normalizeFiles(array $files = []) {
        $normalizedFiles = [];

        foreach ($files as $filesKey => $filesItem) {
            foreach ($filesItem as $itemKey => $itemValue) {
                $normalizedFiles[$itemKey][$filesKey] = $itemValue;
            }
        }

        return $normalizedFiles;
    }

    /**
     * Upload a file.
     *
     * @param array $file A normalized file item - as received from $_FILES variable.
     * @return bool|string TRUE on success, or an error string on failure.
     */
    private function uploadFile(array $file = []) {
        $name = $file['name'];
        $type = $file['type'];
        $tmpName = $file['tmp_name'];
        $error = $file['error'];
        $size = $file['size'];

        /*
         * Validate the file error. The actual upload takes place when the file
         * error is UPLOAD_ERR_OK (the first case in this switch statement).
         *
         * @link https://secure.php.net/manual/en/features.file-upload.errors.php Error Messages Explained.
         */
        switch ($error) {
            case UPLOAD_ERR_OK: /* There is no error, the file can be uploaded. */
                // Validate the file size.
                if ($size > self::UPLOAD_MAX_FILE_SIZE) {
                    return sprintf('The size of the file "%s" exceeds the maximal allowed size (%s Byte).'
                            , $name
                            , self::UPLOAD_MAX_FILE_SIZE
                    );
                }

                // Validate the file type.
                if (!in_array($type, self::UPLOAD_ALLOWED_MIME_TYPES)) {
                    return sprintf('The file "%s" is not of a valid MIME type. Allowed MIME types: %s.'
                            , $name
                            , implode(', ', self::UPLOAD_ALLOWED_MIME_TYPES)
                    );
                }

                // Define the upload path.
                // $uploadDirPath = rtrim(self::UPLOAD_DIR, '/');
                $uploadDirPath = rtrim(self::UPLOAD_DIR.$this->dir_add, '/');
                // $uploadPath = $uploadDirPath . '/' . $name;
                $makeFilename = $this->makeFilename().'.'.explode('/', $type)[1];
                $uploadPath = $uploadDirPath . '/' . $makeFilename;

                // Create the upload directory.
                $this->createDirectory($uploadDirPath);

                // Move the file to the new location.
                if (!move_uploaded_file($tmpName, $uploadPath)) {
                    return sprintf('The file "%s" could not be moved to the specified location.'
                            , $name
                    );
                }

                // return TRUE;
                return array(
                    "result"=> TRUE,
                    "filename"=> $makeFilename
                );

                break;

            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                return sprintf('The provided file "%s" exceeds the allowed file size.'
                        , $name
                );
                break;

            case UPLOAD_ERR_PARTIAL:
                return sprintf('The provided file "%s" was only partially uploaded.'
                        , $name
                );
                break;

            case UPLOAD_ERR_NO_FILE:
                return 'No file provided. Please select at least one file.';
                break;

            //...
            // AND SO ON FOR THE OTHER FILE ERROR TYPES...
            //...

            default:
                return 'There was a problem with the upload. Please try again.';
                break;
        }

        return TRUE;
        // return array(
        //     "result"=> TRUE,
        //     "filename"=> $makeFilename
        // );
    }

    /**
     * Create a directory at the specified path.
     *
     * @param string $path Directory path.
     * @return $this
     */
    // private function createDirectory(string $path) {
    private function createDirectory($path) {
        try {
            if (file_exists($path) && !is_dir($path)) {
                throw new \UnexpectedValueException(
                'The upload directory can not be created because '
                . 'a file having the same name already exists!'
                );
            }
        } catch (\Exception $exc) {
            echo $exc->getMessage();
            exit();
        }

        if (!is_dir($path)) {
            mkdir($path, self::UPLOAD_DIR_ACCESS_MODE, TRUE);
        }

        return $this;
    }

    private function makeFilename() {
        $filename = md5(uniqid(rand(), true));
        return $filename;
    }

}

?>