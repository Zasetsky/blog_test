<?php

namespace App\DTO\Article;

use App\Models\Article;

readonly class ArticleDto
{
	public function __construct(
		public int $id,
		public string $title,
		public string $content,
		public string $createdAt,
	) {
	}

	public static function fromModel(Article $a): self
	{
		return new self(
			id: $a->id,
			title: $a->title,
			content: $a->content,
			createdAt: $a->created_at->toIso8601String(),
		);
	}
}
