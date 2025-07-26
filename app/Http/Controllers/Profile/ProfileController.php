<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:48',
            'character_id' => 'required|exists:characters,id',
        ]);

        /**
         * @var App/Models/User
         */
        $user = Auth::user();

        $user->update($validatedData);

        return redirect()->route('dashboard')->with('success', 'Profile saved successfully!');
    }
}
