<?php

namespace App\Services\Contracts;

use App\DTO\Article\CreateArticleDto;
use App\DTO\Article\UpdateArticleDto;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Article;

interface ArticleServiceInterface
{
	public function list(int $perPage = 10): LengthAwarePaginator;
	public function getById(int $id): Article;
	public function create(CreateArticleDto $dto): Article;
	public function update(int $id, UpdateArticleDto $dto): Article;
	public function delete(int $id): void;
}
