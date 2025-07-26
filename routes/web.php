<?php

use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\Projects\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/profile', function () {
    return Inertia::render('profile');
})->name('profile');

// Authentication
Route::middleware('guest')->group(function () {
    Route::get('auth/redirect', [SocialiteController::class, 'redirect'])->name('google.redirect');
    Route::get('auth/callback', [SocialiteController::class, 'callback'])->name('google.callback');
});

Route::middleware(['auth',])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('profile');
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
