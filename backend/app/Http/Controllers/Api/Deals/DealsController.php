<?php

namespace App\Http\Controllers\Api\Deals;

use App\Http\Controllers\Controller;
use App\Models\Deals;
use App\Models\TasksDeal;
use App\Http\Services\FileUploadService;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DealsController extends Controller
{
    public function all()
    {
        return Deals::orderBy('created_at', 'DESC')->get();
    }

    public function deal($deal_id)
    {
        return Deals::with(['client', 'tasks', 'jobs'])->find($deal_id);
    }

    public function clientDeals($client_id)
    {
        return Deals::where('client_id', $client_id)->orderBy('created_at', 'DESC')->get();
    }

    public function new(Request $request):JsonResponse
    {
        $deal = Deals::create($request->all());

        if($deal){
            return response()->json([
                'data' => 'Сделка успешно создана',
                'user' => $deal
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Ошибка создания сделки'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
        }
    }

    public function options():JsonResponse
    {
        $options = [];

        $options['deal_types'] = DB::table('deal_types')->where('status', 1)->get();
        $options['deal_statuses'] = DB::table('deal_statuses')->where('status', 1)->get();
        $options['delivery_types'] = DB::table('delivery_types')->where('status', 1)->get();
        $options['delivery_ways'] = DB::table('delivery_ways')->where('status', 1)->get();
        $options['pay_types'] = DB::table('pay_types')->where('status', 1)->get();
        $options['pickup_types'] = DB::table('pickup_types')->where('status', 1)->get();

        $options['job_types'] = DB::table('job_types')->get();

        return response()->json([
            'data' => $options
        ]);
    }

    public function editDeal(Request $request, $deal_id)
    {
        $deal = Deals::find($deal_id);

        if($deal->deal_statuses_id != $request->deal_statuses_id){
            $updateTask = new TasksDeal;
            $updateTask->type = 2;
            $updateTask->changed_option = 'deal_statuses';
            $updateTask->changed_from_id = $deal->deal_statuses_id;
            $updateTask->changed_to_id = $request->deal_statuses_id;
            $updateTask->deal_id = $deal_id;
            $updateTask->client_id = $request->client_id;
            $updateTask->manager_id = $request->manager_id;

            $updateTask->save();
        }

        if($deal){
            $deal->update($request->all());
            return response()->json([
                'data' => 'Сделка обновлена',
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Ошибка, сделка не найдена'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
        }
    }

    public function removeDeal($deal_id):JsonResponse
    {
        $deal = Deals::find($deal_id);

        if($deal){
            $deal->delete();
            return response()->json([
                'data' => 'Сделка успешно удалена',
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Ошибка, сделка не найдена'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
        }
    }

    public function getTasks($deal_id)
    {
        return TasksDeal::where('deal_id', $deal_id)->orderBy('updated_at', 'desc')->get();
    }

    public function addTask(Request $request)
    {
        $files = $request->all();

        if(isset($files[0]['files'])){
            $task = new TasksDeal;
            $task->type = $files[1]['type'];
            $task->description = $files[1]['description'];
            $task->files = json_encode($files[0]['files']);
            $task->deal_id = $files[1]['deal_id'];
            $task->client_id = $files[1]['client_id'];
            $task->manager_id = $files[1]['manager_id'];

            $task->save();

            return response()->json([
                'data' => 'Задача добавлена',
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else {
            $deal_task = TasksDeal::create($request->all());

            if($deal_task){
                return response()->json([
                    'data' => 'Задача добавлена',
                ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Ошибка, ошибка создания задачи'
                ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
            }
        }
    }

    public function uploadFiles(Request $request, FileUploadService $uploadService)
    {
        $files = [];

        if($request->hasFile('files')){
            $files = $uploadService->upload($request);

            return response()->json([
                'files' => $files
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Ошибка загрузки файлов'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
        }
    }

    public function editDealTask(Request $request, $task_id)
    {
        $task = TasksDeal::find($task_id);

        $request = $request->all();

        if($request){
            if(isset($request[0]['files'])){
                $task->type = $request[1]['type'];
                $task->description = $request[1]['description'];
                $task->files = json_encode($request[0]['files']);
                $task->deal_id = $request[1]['deal_id'];
                $task->client_id = $request[1]['client_id'];
                $task->manager_id = $request[1]['manager_id'];

                $task->save();

                return response()->json([
                    'data' => 'Задача добавлена',
                ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
            } else {
                $deal_task = $task->update($request);

                if($deal_task){
                    return response()->json([
                        'data' => 'Примечание изменено',
                    ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
                } else {
                    return response()->json([
                        'error' => 'Ошибка, ошибка редактирования примечания'
                    ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
                }
            }
        }
    }

    public function removeDealTask($task_id)
    {
        $task = TasksDeal::find($task_id);

        if($task){
            $task->delete();
            return response()->json([
                'data' => 'Примечание удалено'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else{
            return response()->json([
                'error' => 'Ошибка удаления примечания'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
        }
    }
}
