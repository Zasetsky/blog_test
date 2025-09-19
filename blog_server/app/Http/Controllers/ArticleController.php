<?php

namespace App\Http\Controllers;

use App\Http\Requests\Article\StoreArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Services\Contracts\ArticleServiceInterface;
use App\Http\Requests\Article\UpdateArticleRequest;

class ArticleController extends Controller
{
	public function __construct(private readonly ArticleServiceInterface $articles)
	{
	}

	public function index()
	{
		$page = $this->articles->list(perPage: 10);
		return ArticleResource::collection($page);
	}

	public function show(int $id)
	{
		$article = $this->articles->getById($id);
		return new ArticleResource($article);
	}

	public function store(StoreArticleRequest $request)
	{
		$article = $this->articles->create($request->toDto());
		return (new ArticleResource($article))
			->response()
			->setStatusCode(201);
	}

	public function update(int $id, UpdateArticleRequest $request)
	{
		$article = $this->articles->update($id, $request->toDto());
		return new ArticleResource($article);
	}

	public function destroy(int $id)
	{
		$this->articles->delete($id);
		return response()->noContent();
	}
}
