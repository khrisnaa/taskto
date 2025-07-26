<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Difficulty extends Model
{
    protected $guarded = ['id'];

    public function character(){
        return $this->belongsTo(Character::class);
    }
}
