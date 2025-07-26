<?php

use App\Enums\ProjectDifficulty;
use App\Enums\TaskStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('difficulties', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('character_id')->constrained();
            $table->double('multiplier')->default(0.5);
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('difficulty_id')->constrained('difficulties');
            $table->foreignId('user_id')->constrained('users');
            $table->string('title');
            $table->text('description');
            $table->dateTime('due_date')->nullable();
            $table->string('salt')->nullable();
            $table->boolean('is_finished')->default(false);
            $table->boolean('is_public')->default(false);
            $table->timestamps();
        });

        Schema::create('project_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('project_id')->constrained('projects')->cascadeOnDelete();
            $table->string('url');
            $table->timestamps();
        });

        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('project_id')->constrained('projects')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('assignee_id')->constrained('users');
            $table->string('title');
            $table->text('description');
            $table->integer('exp')->default(0);
            $table->dateTime('due_date');
            $table->enum('status', [
                TaskStatus::Draft->value,
                TaskStatus::OnProgress->value,
                TaskStatus::Completed->value
            ])->default(TaskStatus::Draft->value);
            $table->timestamps();
        });

        Schema::create('task_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained('tasks')->cascadeOnDelete();
            $table->string('url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('difficulties');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('project_attachments');
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('task_attachments');
    }
};
