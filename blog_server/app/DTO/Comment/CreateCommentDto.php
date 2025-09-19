<?php

namespace App\DTO\Comment;

readonly class CreateCommentDto
{
	public function __construct(
		public int $articleId,
		public string $authorName,
		public string $content,
	) {
	}
}
