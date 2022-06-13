<?php

namespace App\Http\Controllers\Api\Deals;

use App\Http\Controllers\Controller;
use App\Jobs\DealJobTask;
use App\Models\JobsDeal;
use App\Services\TimeDifferenceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class JobsDealController extends Controller
{
    public const STATUS_ACTIVE = 1;
    public const STATUS_COMPLETE = 2;
    public const STATUS_EXPIRED = 3;

    public function all($deal_id)
    {
        return JobsDeal::where('deal_id', $deal_id)->get();
    }

    public function newJob(Request $request, TimeDifferenceService $differenceService)
    {
        $job = JobsDeal::create($request->all());

        DealJobTask::dispatch($job->id)->delay(now('Europe/Vienna')->addMinutes($differenceService->getDiff($job->end_time, null, 'Europe/Vienna')));

        if($job){
            return response()->json([
                'data' => 'Задача успешно создана',
                'res' => $job,
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Ошибка создания задачи'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
        }
    }

    public function removeJob($job_id)
    {
        $job = JobsDeal::find($job_id);

        if($job){
            $job->delete();
            return response()->json([
                'data' => 'Задача удалена'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else{
            return response()->json([
                'error' => 'Ошибка удаления задачи'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
        }
    }

    public function editJob(Request $request, TimeDifferenceService $differenceService, $job_id)
    {
        $job = JobsDeal::find($job_id);

        $result = $job->update($request->all());

        DealJobTask::dispatch($job->id)->delay(now('Europe/Vienna')->addMinutes($differenceService->getDiff($job->end_time, null, 'Europe/Vienna')));

        if($result){
            return response()->json([
                'data' => 'Задача успешно обновлена'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else{
            return response()->json([
                'error' => 'Ошибка редактирования задачи'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
        }
    }

    public function completeJob(Request $request, $job_id)
    {
        $job = JobsDeal::find($job_id);

        $job->result_message = $request->result_message;
        $job->status = self::STATUS_COMPLETE;
        $job->save();

        return response()->json([
            'data' => 'Задача успешно выполнена'
        ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
    }
}
