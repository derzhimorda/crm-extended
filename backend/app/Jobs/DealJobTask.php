<?php

namespace App\Jobs;

use App\Models\JobsDeal;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class DealJobTask implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * JobDeal object.
     *
     * @var
     */
    protected $job_id;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($job_id)
    {
        $this->job_id = $job_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $job = JobsDeal::find($this->job_id);
        if($job->status !== 2){
            $job->status = 3;
            $job->save();
        }
    }
}
