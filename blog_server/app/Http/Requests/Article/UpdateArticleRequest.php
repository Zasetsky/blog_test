<?php

namespace App\Http\Requests\Article;

use Illuminate\Foundation\Http\FormRequest;
use App\DTO\Article\UpdateArticleDto;

class UpdateArticleRequest extends FormRequest
{
	public function rules(): array
	{
		return [
			'title' => ['sometimes', 'string', 'max:255'],
			'content' => ['sometimes', 'string', 'min:1'],
		];
	}

	public function toDto(): UpdateArticleDto
	{
		$v = $this->validated();
		return new UpdateArticleDto(
			$v['title'] ?? null,
			$v['content'] ?? null,
		);
	}
}
