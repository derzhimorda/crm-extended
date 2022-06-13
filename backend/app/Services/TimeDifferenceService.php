<?php

namespace App\Services;

use Carbon\Carbon;

class TimeDifferenceService
{
    /**
     * Return difference between dateTime in minutes.
     *
     * @param $end_date
     * @param null $start_date
     * @param null $timezone
     * @return int
     */
    public function getDiff($end_date, $start_date = null, $timezone = null):int
    {
        if(is_null($timezone)){
            $timezone = 'UTC';
        }

        if(is_null($start_date)){
            $start_date = Carbon::now($timezone);
        }

        $diff = new Carbon($end_date, $timezone);

        return $diff->diffInMinutes($start_date);
    }
}
