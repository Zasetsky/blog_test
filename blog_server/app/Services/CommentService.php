<?php

namespace App\Services;

use App\Services\Contracts\CommentServiceInterface;
use App\DTO\Comment\CreateCommentDto;
use App\Models\Article;
use App\Models\Comment;

class CommentService implements CommentServiceInterface
{
	public function add(CreateCommentDto $dto): Comment
	{
		// инварианты: статья должна существовать
		$article = Article::findOrFail($dto->articleId);

		return Comment::create([
			'article_id' => $article->id,
			'author_name' => $dto->authorName,
			'content' => $dto->content,
		]);
	}
}
