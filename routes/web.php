<?php

use App\Http\Controllers\Projects\ProjectController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/profile', function () {
    return Inertia::render('profile');
})->name('profile');

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
        Route::get('index', [ProjectController::class, 'index'])->name('index');
        Route::get('create', [ProjectController::class, 'create'])->name('create');
        Route::post('store', [ProjectController::class, 'store'])->name('store');
        Route::put('{project}/update', [ProjectController::class, 'update'])->name('update');
        Route::delete('{project}/delete', [ProjectController::class, 'destroy'])->name('destroy');

        Route::prefix('attachments')->name('attachment.')->group(function () {
            Route::post('{project}/store', [ProjectController::class, 'addAttachment'])->name('store');
            Route::delete('{project}/delete', [ProjectController::class, 'deleteAttachment'])->name('delete');
        });
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
