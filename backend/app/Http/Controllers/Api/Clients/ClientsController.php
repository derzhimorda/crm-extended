<?php

namespace App\Http\Controllers\Api\Clients;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfiles;
use App\Models\UsersRole;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientsController extends Controller
{
    public function all()
    {
        return UserProfiles::all();
    }

    public function client($client_id)
    {
        return UserProfiles::where('user_id', $client_id)->first();
    }

    public function getClients()
    {
        return User::whereRelation('roles', 'role_id', '=', 6)->with('roles')
            ->leftJoin('user_profiles', 'users.id', '=', 'user_profiles.user_id')
            ->get(['user_profiles.*', 'users.*']);
    }

    public function update(Request $request)
    {
        $client = UserProfiles::where('user_id', $request->user_id);

        if($client){
            $client->update($request->all());

            return response()->json([
                'data' => 'Успешно сохранено'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Ошибка, пользователь не найден'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
        }
    }

    public function new(Request $request)
    {
        $new_user = User::create(array('name' => $request->name, 'email' => $request->email, 'password' => '123456', 'password_confirmation' => '123456'));

        if($new_user){
            $user = User::latest()->first();

            UsersRole::create([
                'user_id' => $user->id,
                'role_id' => 6
            ]);

            $request->merge(['user_id' => $user->id]);
            $user_data = $request->all();

            $client = UserProfiles::create($user_data);

            if($client){
                return response()->json([
                    'data' => 'Пользователь сохранен',
                    'user' => $client
                ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Ошибка, ошибка создания нового клиента'
                ], \Symfony\Component\HttpFoundation\Response::HTTP_NO_CONTENT);
            }
        }
    }

    public function delete(Request $request, $id)
    {
        $user = User::find((int)$id);

        if($user){
            $user->delete();
            return response()->json([
                'data' => 'Клиент удален'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Клиент не найден'
            ], \Symfony\Component\HttpFoundation\Response::HTTP_OK);
        }
    }
}
