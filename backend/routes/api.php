<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Auth routs
Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::post('signup', [\App\Http\Controllers\AuthController::class, 'signup']);
    Route::get('me', [\App\Http\Controllers\AuthController::class, 'me']);
    Route::post('send-password-reset-link', [\App\Http\Controllers\ResetPasswordController::class, 'sendEmail']);
    Route::post('reset-password', [\App\Http\Controllers\ChangePasswordController::class, 'process']);
});

//User routs
Route::group([
    'middleware' => 'api',
    'prefix' => 'users'
], function ($router) {
    Route::get('all', [\App\Http\Controllers\Api\Users\UsersController::class, 'getUsers']);
    Route::get('roles/all', [\App\Http\Controllers\Api\Users\UsersController::class, 'getAllRoles']);
    Route::get('/{id}', [\App\Http\Controllers\Api\Users\UsersController::class, 'getUserById']);
    Route::get('/{id}/remove', [\App\Http\Controllers\Api\Users\UsersController::class, 'removeUser']);
    Route::post('/new', [\App\Http\Controllers\Api\Users\UsersController::class, 'newUser']);
});

//Client routs
Route::group([
    'middleware' => 'api',
    'prefix' => 'clients'
], function ($router){
    Route::get('/', [\App\Http\Controllers\Api\Clients\ClientsController::class, 'all']);
    Route::get('/{id}', [\App\Http\Controllers\Api\Clients\ClientsController::class, 'client']);
    Route::get('/authUser', [\App\Http\Controllers\Api\Clients\ClientsController::class, 'authUser']);
    Route::post('/update', [\App\Http\Controllers\Api\Clients\ClientsController::class, 'update']);
    Route::post('/new', [\App\Http\Controllers\Api\Clients\ClientsController::class, 'new']);
    Route::get('/delete/{id}', [\App\Http\Controllers\Api\Clients\ClientsController::class, 'delete']);
});

//Deal routs
Route::group([
    'middleware' => 'api',
    'prefix' => 'deals'
], function ($router){
    Route::get('/', [\App\Http\Controllers\Api\Deals\DealsController::class, 'all']);
    Route::get('/{id}', [\App\Http\Controllers\Api\Deals\DealsController::class, 'deal']);
    Route::get('/{id}/remove', [\App\Http\Controllers\Api\Deals\DealsController::class, 'removeDeal']);
    Route::get('/options/get', [\App\Http\Controllers\Api\Deals\DealsController::class, 'options']);
    Route::get('/client_deals/{client_id}', [\App\Http\Controllers\Api\Deals\DealsController::class, 'clientDeals']);
    Route::get('/{id}/get_tasks', [\App\Http\Controllers\Api\Deals\DealsController::class, 'getTasks']);
    Route::get('/tasks/{task_id}/remove', [\App\Http\Controllers\Api\Deals\DealsController::class, 'removeDealTask']);
    Route::post('/{task_id}/edit', [\App\Http\Controllers\Api\Deals\DealsController::class, 'editDealTask']);
    Route::post('/new', [\App\Http\Controllers\Api\Deals\DealsController::class, 'new']);
    Route::post('/edit/{id}', [\App\Http\Controllers\Api\Deals\DealsController::class, 'editDeal']);
    Route::post('/add_task', [\App\Http\Controllers\Api\Deals\DealsController::class, 'addTask']);
    Route::post('/uploadFiles', [\App\Http\Controllers\Api\Deals\DealsController::class, 'uploadFiles']);
    Route::get('/{id}/jobs', [\App\Http\Controllers\Api\Deals\JobsDealController::class, 'all']);
    Route::get('/remove_job/{id}', [\App\Http\Controllers\Api\Deals\JobsDealController::class, 'removeJob']);
    Route::post('/edit_job/{id}', [\App\Http\Controllers\Api\Deals\JobsDealController::class, 'editJob']);
    Route::post('/complete_job/{id}', [\App\Http\Controllers\Api\Deals\JobsDealController::class, 'completeJob']);
    Route::post('/new_job', [\App\Http\Controllers\Api\Deals\JobsDealController::class, 'newJob']);
});



