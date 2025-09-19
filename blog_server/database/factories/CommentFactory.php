<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
	public function definition(): array
	{
		return [
			'author_name' => $this->faker->name(),
			'content' => $this->faker->sentences(2, true),
		];
	}
}
