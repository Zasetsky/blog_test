<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
	public function toArray($request): array
	{
		return [
			'id' => $this->id,
			'article_id' => $this->article_id,
			'author_name' => $this->author_name,
			'content' => $this->content,
			'created_at' => $this->created_at?->toIso8601String(),
		];
	}
}
