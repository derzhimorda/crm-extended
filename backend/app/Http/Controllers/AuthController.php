<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out.'
        ];
    }

    public function me(Request $request)
    {
        $user = $request->user();
        if($user){
            $user['roles'] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//            foreach (User::find($user->id)->roles as $key => $value){
//               $user['roles'][$key] = $value['role_id'];
//            }
        }
//        $user['roles'] = User::find($user->id)->roles[0]['role_id'];

        return response($user, 200);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $fields['email'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response([
                'message' => 'Неверные данные для входа'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $user['token'] = $token;

//        $response = [
//            'user' => $user,
//            'token' => $token
//        ];

        return response($user, 201);
    }
}
