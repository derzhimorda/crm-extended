<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Roles;
use Illuminate\Support\Facades\DB;

class OptionsController extends Controller
{
    public function getAllOptions()
    {
        $options = [];

        $options['roles'] = Roles::all();
        $options['deal_types'] = DB::table('deal_types')->where('status', 1)->get() ?? null;
        $options['deal_statuses'] = DB::table('deal_statuses')->where('status', 1)->get() ?? null;
        $options['delivery_types'] = DB::table('delivery_types')->where('status', 1)->get() ?? null;
        $options['delivery_ways'] = DB::table('delivery_ways')->where('status', 1)->get() ?? null;
        $options['pay_types'] = DB::table('pay_types')->where('status', 1)->get() ?? null;
        $options['pickup_types'] = DB::table('pickup_types')->where('status', 1)->get() ?? null;
        $options['job_types'] = DB::table('job_types')->get() ?? null;
        $options['user_statuses'] = DB::table('user_statuses')->get() ?? null;

        return response($options, 201);
    }

    public function getSomeOptions($options)
    {

    }
}
