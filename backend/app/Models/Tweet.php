<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tweet extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'user_id', 'likes'];

    protected $with = ['owner'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function likedByUsers()
{
    return $this->belongsToMany(User::class, 'tweet_likes')->withTimestamps();
}
}
