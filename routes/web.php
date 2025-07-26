<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Authentication
Route::middleware('guest')->group(function () {
    Route::get('auth/redirect', function () {
        return Socialite::driver('google')->redirect();
    });

    Route::get('auth/callback', function () {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::updateOrCreate([
                'email' => $googleUser->email,
            ], [
                'name' => $googleUser->name,
                'avatar_url' => $googleUser->getAvatar() ?? '',
            ]);

            Auth::login($user);
        } catch (Exception $exc) {
            Log::error("[ Auth ] Socialite error: $exc");
        }

        return redirect('/dashboard');
    });
});

Route::middleware(['auth',])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('projects')->name('project.')->group(function () {
        Route::post('create', [])->name('create');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
