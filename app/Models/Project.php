<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasUuids;

    protected $guarded = ['id'];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(ProjectAttachment::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function collaborators(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    public function difficulty(): BelongsTo
    {
        return $this->belongsTo(Difficulty::class);
    }
}
