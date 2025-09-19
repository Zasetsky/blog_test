<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\StoreCommentRequest;
use App\Http\Resources\CommentResource;
use App\Services\Contracts\CommentServiceInterface;

class CommentController extends Controller
{
	public function __construct(private readonly CommentServiceInterface $comments)
	{
	}

	public function store(int $id, StoreCommentRequest $request)
	{
		$comment = $this->comments->add($request->toDto($id));
		return (new CommentResource($comment))
			->response()
			->setStatusCode(201);
	}
}
