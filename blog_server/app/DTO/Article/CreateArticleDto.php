<?php

namespace App\DTO\Article;

readonly class CreateArticleDto
{
	public function __construct(
		public string $title,
		public string $content,
	) {
	}
}
