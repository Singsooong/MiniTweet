<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'firstname' => $this->faker->firstName(),
            'surname'   => $this->faker->lastName(),
            'email'     => $this->faker->unique()->safeEmail(),
            'password'  => Hash::make('password123'),
        ];
    }
}
