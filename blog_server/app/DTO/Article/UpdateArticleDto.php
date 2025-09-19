<?php

namespace App\DTO\Article;

final class UpdateArticleDto
{
	public function __construct(
		public readonly ?string $title = null,
		public readonly ?string $content = null,
	) {
	}
}
