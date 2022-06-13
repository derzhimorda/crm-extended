<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersRole extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'users_role';

    protected $fillable = [
        'role_id', 'user_id'
    ];
}
