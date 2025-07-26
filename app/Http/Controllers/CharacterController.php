<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function show(Character $character)
    {
        Log::info('Character', ['character' => $character]);

        return null;
    }

    public function selectCharacter(Request $request)
    {
        $request->validate([
            'character_id' => 'required|exists:characters,id'
        ]);

        User::where('id', Auth::user()->id)->update([
            'character_id' => $request->character_id
        ]);

        return null;

        // -> pake message seprti ini: ->with('success', 'Character berhasil dipilih!')
    }

    public function getBosses()
    {
        $bosses = Character::where('is_boss', true)->get();

        Log::info('Bosses', ['bosses' => $bosses]);

        return null;
    }
}
