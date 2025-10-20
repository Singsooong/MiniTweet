<?php

use App\Models\User;
use App\Models\Tweet;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('creates a tweet successfully', function () {
    $user = User::factory()->create();
    $token = $user->createToken('App')->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => "Bearer {$token}",
    ])->postJson('/api/tweets', [
        'content' => 'This is my first tweet!',
    ]);

    $response->assertStatus(201)
             ->assertJson([
                 'success' => true,
                 'message' => 'Tweet created successfully',
             ])
             ->assertJsonStructure([
                 'success',
                 'message',
                 'tweet' => ['id', 'content', 'user_id', 'likes', 'owner'],
             ]);

    $this->assertDatabaseHas('tweets', [
        'content' => 'This is my first tweet!',
    ]);
});

it('rejects invalid tweet creation', function () {
    $user = User::factory()->create();
    $token = $user->createToken('App')->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => "Bearer {$token}",
    ])->postJson('/api/tweets', [
        'content' => '', // empty content
    ]);

    $response->assertStatus(422)
             ->assertJson([
                 'success' => false,
             ]);
});

it('retrieves all tweets successfully', function () {
    $user = User::factory()->create();
    Tweet::factory()->count(3)->create();

    $token = $user->createToken('App')->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => "Bearer {$token}",
    ])->getJson('/api/tweets');

    $response->assertStatus(200)
             ->assertJsonStructure([
                 'success',
                 'tweets' => [
                     '*' => ['id', 'content', 'likes', 'owner'],
                 ]
             ]);
});

it('toggles like on a tweet', function () {
    $user = User::factory()->create();
    $tweet = Tweet::factory()->create();
    $token = $user->createToken('App')->plainTextToken;

    // Like
    $likeResponse = $this->withHeaders([
        'Authorization' => "Bearer {$token}",
    ])->postJson("/api/tweets/{$tweet->id}/like");

    $likeResponse->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'liked' => true,
                 ]);

    // Unlike
    $unlikeResponse = $this->withHeaders([
        'Authorization' => "Bearer {$token}",
    ])->postJson("/api/tweets/{$tweet->id}/like");

    $unlikeResponse->assertStatus(200)
                   ->assertJson([
                       'success' => true,
                       'liked' => false,
                   ]);
});
