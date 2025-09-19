<?php

namespace App\Http\Requests\Article;

use Illuminate\Foundation\Http\FormRequest;
use App\DTO\Article\CreateArticleDto;

class StoreArticleRequest extends FormRequest
{
	public function rules(): array
	{
		return [
			'title' => ['required', 'string', 'max:255'],
			'content' => ['required', 'string', 'min:1'],
		];
	}

	public function toDto(): CreateArticleDto
	{
		$v = $this->validated();
		return new CreateArticleDto($v['title'], $v['content']);
	}
}
