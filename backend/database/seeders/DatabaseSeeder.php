<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('deal_statuses')->insert([
            'name' => Str::random(10),
            'status' => Str::random(10).'@gmail.com'
        ]);
    }
}
