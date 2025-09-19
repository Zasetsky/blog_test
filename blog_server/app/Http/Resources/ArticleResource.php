<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
	public function toArray($request): array
	{
		return [
			'id' => $this->id,
			'title' => $this->title,
			'content' => $this->content,
			'created_at' => $this->created_at?->toIso8601String(),
			'comments' => CommentResource::collection($this->whenLoaded('comments')),
		];
	}
}
