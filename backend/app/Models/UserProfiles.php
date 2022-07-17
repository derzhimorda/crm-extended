<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfiles extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name',
        'mobile', 'add_mobile',
        'email', 'ySell',
        'adviser_id', 'manager_id',
        'work_status_id', 'fb_status_id',
        'ref_option_id', 'delivery_id',
        'fb_link', 'tg_link',
        'vb_link', 'profile_avatar',
        'company', 'partner_fb',
        'position', 'google_link'
    ];
}
