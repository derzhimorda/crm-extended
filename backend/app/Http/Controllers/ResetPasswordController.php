<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {
        if(!$this->validateEmail($request->email)){
            return $this->failedResponse();
        }

        $this->send($request->email);

        return $this->successResponse();
    }

    public function validateEmail($email)
    {
        return !!User::where('email', $email)->first();
    }

    private function failedResponse()
    {
        return response()->json([
            'error' => 'E-mail doesn\'t exist in system'
        ], Response::HTTP_NOT_FOUND);
    }

    private function send($email)
    {
        $token = $this->createToken($email);
        var_dump($token);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    private function successResponse()
    {
        return response()->json([
            'data' => 'Reset email is successfully, please check your inbox.'
        ], Response::HTTP_OK);
    }

    private function createToken($email)
    {
        $oldToken = DB::table('password_resets')->where('email', $email)->first();
        if($oldToken){
            return $oldToken->token;
        }
        $token = Str::random(60);
        $this->saveToken($token, $email);

        return $token;
    }

    private function saveToken($token, $email)
    {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }
}
