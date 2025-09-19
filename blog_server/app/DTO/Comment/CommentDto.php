<?php

namespace App\DTO\Comment;

use App\Models\Comment;

readonly class CommentDto
{
	public function __construct(
		public int $id,
		public int $articleId,
		public string $authorName,
		public string $content,
		public string $createdAt,
	) {
	}

	public static function fromModel(Comment $c): self
	{
		return new self(
			id: $c->id,
			articleId: $c->article_id,
			authorName: $c->author_name,
			content: $c->content,
			createdAt: $c->created_at->toIso8601String(),
		);
	}
}
