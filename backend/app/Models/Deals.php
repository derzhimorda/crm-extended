<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deals extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'budget', 'deal_types_id',
        'deal_statuses_id', 'manager_id',
        'adviser_id', 'delivery_ways_id',
        'delivery_types_id', 'pickup_types_id',
        'pay_types_id', 'client_id', 'inspector'
    ];

    public function client()
    {
        return $this->belongsTo(UserProfiles::class, 'client_id', 'user_id');
    }

    public function tasks()
    {
        return $this->hasMany(TasksDeal::class, 'deal_id');
    }

    public function jobs(){
        return $this->hasMany(JobsDeal::class, 'deal_id');
    }
}
