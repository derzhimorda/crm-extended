<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {
        return $this->getPasswordRequestTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenErrorResponse();
    }

    private function getPasswordRequestTableRow($request)
    {
        return DB::table('password_resets')->where(['email' => $request->email, 'token' => $request->resetToken]);
    }

    private function changePassword($request)
    {
        $user = User::whereEmail($request->email)->first();
        $user->update(['password' => $request->password]);
        $this->getPasswordRequestTableRow($request)->delete();
        return response()->json([
            'data' => 'Password Successfully changed'
        ], Response::HTTP_CREATED);
    }

    private function tokenErrorResponse()
    {
        return response()->json([
            'error' => 'Token or E-mail is incorrect'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
