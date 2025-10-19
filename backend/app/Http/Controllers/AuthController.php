<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register (Request $request) {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string',
            'surname' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()]);
        }
        $user = User::create([
            'firstname' => $request['firstname'],
            'surname' => $request['surname'],
            'email' => $request['email'],
            'password' => Hash::make($request['password'])
        ]);
        $fields ['firstname'] = $user -> firstname;
        $fields ['surname'] = $user -> surname;
        $fields ['email'] = $user -> email;
        $fields ['token'] = $user->createToken('App')->plainTextToken;


        return response()->json($fields);

    }
    public function login(Request $request){

        if(!Auth::attempt($request->only('email','password'))){
            return response([
                'message' => 'Invalid login details'
            ], 401);
        }
        $user =Auth::user();
         $fields ['firstname'] = $user -> firstname;
        $fields ['surname'] = $user -> surname;
        $fields ['email'] = $user -> email;
        $fields ['token'] = $user->createToken('App')->plainTextToken;
        return response()->json($fields);
    }
}
