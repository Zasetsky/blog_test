<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;
use App\DTO\Comment\CreateCommentDto;

class StoreCommentRequest extends FormRequest
{
	public function rules(): array
	{
		return [
			'author_name' => ['required', 'string', 'max:120'],
			'content' => ['required', 'string', 'min:1'],
		];
	}

	public function toDto(int $articleId): CreateCommentDto
	{
		$v = $this->validated();
		return new CreateCommentDto($articleId, $v['author_name'], $v['content']);
	}
}
