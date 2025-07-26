<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CharacterController extends Controller
{
    public function index()
    {
        $characters = Character::where('is_boss', false)->get();
        $bosses = Character::where('is_boss', true)->get();

        Log::info('Characters', ['characters' => $characters, 'bosses' => $bosses]);

        return null;
    }
}
