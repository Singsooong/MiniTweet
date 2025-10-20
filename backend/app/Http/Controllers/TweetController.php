<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TweetController extends Controller
{
    //Get all tweets
    public function index()
    {
       $tweets = Tweet::with('owner:id,email')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'tweets' => $tweets
        ], 200);
    }
    //Create a tweet
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:280'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $tweet = Tweet::create([
            'content' => $request->content,
            'user_id' => $request->user()->id,
            'likes' => 0
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tweet created successfully',
            'tweet' => $tweet->load('owner'),
        ], 201);
    }
    public function toggleLike($id)
{
    $tweet = Tweet::findOrFail($id);
    $user = Auth::user();

    // Check if user already liked the tweet
    if ($tweet->likedByUsers()->where('user_id', $user->id)->exists()) {
        // Unlike
        $tweet->likedByUsers()->detach($user->id);
        $tweet->decrement('likes');
        $liked = false;
    } else {
        // Like
        $tweet->likedByUsers()->attach($user->id);
        $tweet->increment('likes');
        $liked = true;
    }

    return response()->json([
        'success' => true,
        'liked' => $liked,
        'likes' => $tweet->likes,
    ]);
}


}
