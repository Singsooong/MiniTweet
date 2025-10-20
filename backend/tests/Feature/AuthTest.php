<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('registers a user successfully', function () {
    $response = $this->postJson('/api/register', [
        'firstname' => 'Carlo',
        'surname' => 'Dequiña',
        'email' => 'carlo@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(200)
             ->assertJson([
                 'success' => true,
             ])
             ->assertJsonStructure([
                 'success',
                 'user' => ['id', 'firstname', 'surname', 'email'],
                 'token'
             ]);

    $this->assertDatabaseHas('users', [
        'email' => 'carlo@example.com',
    ]);
});

it('fails registration with missing fields', function () {
    $response = $this->postJson('/api/register', [
        'email' => 'invalid@example.com'
    ]);

    $response->assertStatus(422)
             ->assertJson([
                 'success' => false,
             ]);
});

it('logs in a registered user', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'password' => Hash::make('password123'),
    ]);

    $response = $this->postJson('/api/login', [
        'email' => 'test@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(200)
             ->assertJson([
                 'success' => true,
             ])
             ->assertJsonStructure([
                 'success',
                 'user',
                 'token'
             ]);
});

it('rejects login with wrong credentials', function () {
    $user = User::factory()->create([
        'email' => 'wrong@example.com',
        'password' => Hash::make('password123'),
    ]);

    $response = $this->postJson('/api/login', [
        'email' => 'wrong@example.com',
        'password' => 'wrongpass',
    ]);

    $response->assertStatus(401)
             ->assertJson([
                 'message' => 'Invalid login details',
             ]);
});

it('logs out an authenticated user', function () {
    $user = User::factory()->create();
    $token = $user->createToken('App')->plainTextToken;

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->postJson('/api/logout');

    $response->assertStatus(200)
             ->assertJson([
                 'success' => true,
                 'message' => 'Logged out successfully',
             ]);
});
