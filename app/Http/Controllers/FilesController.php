<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class FilesController extends Controller
{
    public function uploadFile(){
        $file = \Request::file('upload');
        $fileName = $file->getClientOriginalName();
        if (file_exists("images/uploads/" . $fileName))
        {
            echo $_FILES["upload"]["name"] . " already exists please choose another image.";
        }
        else
        {
         $result = $file->move("images/uploads", $fileName);
         echo "Stored in: " . "images/uploads/" . $_FILES["upload"]["name"];
        }
        // Required: anonymous function reference number as explained above.
        $funcNum = $_GET['CKEditorFuncNum'];
        // Optional: instance name (might be used to load a specific configuration file or anything else).
        $CKEditor = $_GET['CKEditor'];
        // Optional: might be used to provide localized messages.
        $langCode = $_GET['langCode'];
         
        // Check the $_FILES array and save the file. Assign the correct path to a variable ($url).
        $url = "/images/uploads/" . $fileName;
        // Usually you will only assign something here if the file could not be uploaded.
        $message = '';
        echo "<script type='text/javascript'> window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message');</script>";
    }

    public function getUploader(){
        return 'not implemented (FilesController.getUploader())';
    }

    public function getBrowser(){

        return view('files.file-browser', compact([]));
    }

    public function getFiles(){

    }

}