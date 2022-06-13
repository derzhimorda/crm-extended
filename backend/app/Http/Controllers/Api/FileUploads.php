<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;

class FileUploads extends Controller
{
    private $allow_extensions = [
        'jpg', 'jpeg', 'png', 'doc', 'docx',
        'xls', 'xlsx', 'txt', 'pdf'
    ];

    public function file(Request $request)
    {
        if($request->hasFile('files')){
            $files = [];
            $i = 0;

            foreach($request->file('files') as $file){
                $file_name = $file->getClientOriginalName();
                $file_extension = $file->getClientOriginalExtension();

                if(!in_array($file_extension, $this->allow_extensions)){
                    break;
                }

                $finaly_name = str_replace(' ', '_', $file_name);
                $path = $file->storeAs('public/deals', $finaly_name);

                if($path){
                    $files[$i]['file'] = $finaly_name;
                    $files[$i]['path'] = $path;
                } else {
                    return false;
                }

                $i++;
            }

//            if($path){
//                return response()->json([
//                    'data' => 'Файлы загружены'
//                ]);
//            } else {
//                return response()->json([
//                    'error' => 'Ошибка загрузки файлов'
//                ]);
//            }
        }
    }
}
