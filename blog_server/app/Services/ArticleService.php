<?php

namespace App\Services;

use App\Services\Contracts\ArticleServiceInterface;
use App\DTO\Article\CreateArticleDto;
use App\DTO\Article\UpdateArticleDto;
use App\Models\Article;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ArticleService implements ArticleServiceInterface
{
	public function list(int $perPage = 10): LengthAwarePaginator
	{
		return Article::query()->latest()->paginate($perPage);
	}

	public function getById(int $id): Article
	{
		return Article::with(['comments' => fn($q) => $q->latest()])->findOrFail($id);
	}

	public function create(CreateArticleDto $dto): Article
	{
		return Article::create([
			'title' => $dto->title,
			'content' => $dto->content,
		]);
	}

	public function update(int $id, UpdateArticleDto $dto): Article
	{
		$article = Article::findOrFail($id);

		if ($dto->title !== null) {
			$article->title = $dto->title;
		}
		if ($dto->content !== null) {
			$article->content = $dto->content;
		}

		$article->save();
		return $article;
	}

	public function delete(int $id): void
	{
		Article::findOrFail($id)->delete();
	}
}
