<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TasksDeal extends Model
{
    use HasFactory;

    protected $table = 'tasks_deal';

    protected $fillable = [
        'type', 'description', 'files',
        'changed_option', 'changed_from_id',
        'changed_to_id', 'deal_id', 'client_id',
        'manager_id'
    ];
}
