<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Comment;

class DemoContentSeeder extends Seeder
{
	public function run(): void
	{
		Article::factory()->count(3)->create()->each(function (Article $article) {
			Comment::factory()->count(2)->create([
				'article_id' => $article->id,
			]);
		});
	}
}
