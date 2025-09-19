<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	public function up(): void
	{
		Schema::create('comments', function (Blueprint $table) {
			$table->id();
			$table->foreignId('article_id')->constrained('articles')->cascadeOnDelete();
			$table->string('author_name', 120);
			$table->text('content');
			$table->timestamps();

			$table->index(['article_id', 'created_at']);
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('comments');
	}
};
