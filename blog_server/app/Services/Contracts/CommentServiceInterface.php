<?php

namespace App\Services\Contracts;

use App\DTO\Comment\CreateCommentDto;
use App\Models\Comment;

interface CommentServiceInterface
{
	public function add(CreateCommentDto $dto): Comment;
}
