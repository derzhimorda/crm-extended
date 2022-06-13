<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobsDeal extends Model
{
    use HasFactory;

    protected $table = 'jobs_deal';

    protected $fillable = [
        'type', 'message', 'job_type_id',
        'user_id', 'deal_id', 'end_time',
        'status', 'result_message'
    ];
}
