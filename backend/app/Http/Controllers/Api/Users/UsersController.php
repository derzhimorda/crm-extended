<?php

namespace App\Http\Controllers\Api\Users;

use App\Http\Controllers\Controller;
use App\Models\Roles;
use App\Models\User;
use App\Models\UserProfiles;
use App\Models\UsersRole;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    public function all()
    {
        return User::with(['roles', 'deals'])->get();

    }

    public function getUsers()
    {
        return User::whereRelation('roles', 'role_id', '!=', 6)->with('roles')->get();
    }

    public function getUserById($user_id){
        return User::with('roles')->find($user_id);
    }

    public function getUsersByRole($role_id)
    {
        //TODO;
    }

    public function getAllRoles()
    {
        return response(['roles' => Roles::all()], 201);
    }

    public function newUser(Request $request):JsonResponse
    {
        $user = User::create($request->all());

        if($user){
            if($request->role){
                foreach ($request->role as $role){
                    if(!is_null($role)){
                        UsersRole::create([
                            'user_id' => $user->id,
                            'role_id' => $role
                        ]);
                    }
                }
            }

            $randomStr =

            UserProfiles::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'email' => $request->email,
                'mobile' => $request->mobile,
                'profile_avatar' => $request->profile_avatar ? $request->profile_avatar : ''
            ]);

            //TODO Send email to new user after register with her credentials.

            return response()->json([
                'data' => 'Пользователь создан',
                'user' => $user
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Ошибка создания пользователя'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
        }
    }

    public function removeUser($user_id):JsonResponse
    {
        $user = User::find($user_id);

        if($user){
            $user->delete();
            return response()->json([
                'data' => 'Пользователь удален',
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Ошибка, пользователь не найден'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
        }
    }

    public function editUser(Request $request, $user_id)
    {

    }
}
