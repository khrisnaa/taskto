<?php

use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Project\TaskController;
use App\Http\Controllers\Projects\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/profile', [CharacterController::class, 'index'])->name('profile');

Route::get('/project', function () {
    return Inertia::render('project');
})->name('project');

Route::get('/project/1', function () {
    return Inertia::render('project-detail');
})->name('project.detail');

// Authentication
Route::middleware('guest')->group(function () {
    Route::get('auth/redirect', [SocialiteController::class, 'redirect'])->name('google.redirect');
    Route::get('auth/callback', [SocialiteController::class, 'callback'])->name('google.callback');
});

Route::middleware(['auth'])->group(function () {
    Route::get('auth/logout', [SocialiteController::class, 'destroy'])->name('logout');
    Route::get('dashboard', function () {
        return Inertia::render('profile');
    })->name('dashboard');
    Route::prefix('projects')->name('project.')->group(function () {
        Route::get('index', [ProjectController::class, 'index'])->name('index');
        Route::get('create', [ProjectController::class, 'create'])->name('create');
        Route::get('{project}/show', [ProjectController::class, 'show'])->name('show');
        Route::post('store', [ProjectController::class, 'store'])->name('store');
        Route::put('{project}/update', [ProjectController::class, 'update'])->name('update');
        Route::delete('{project}/delete', [ProjectController::class, 'destroy'])->name('destroy');

        Route::prefix('attachments')->name('attachment.')->group(function () {
            Route::post('{project}/store', [ProjectController::class, 'addAttachment'])->name('store');
            Route::delete('{project}/delete', [ProjectController::class, 'deleteAttachment'])->name('delete');
        });
    });

    Route::prefix('tasks')->name('task.')->group(function () {
        Route::get('create', [TaskController::class, 'create'])->name('create');
        Route::post('{project}/store', [TaskController::class, 'store'])->name('store');
        Route::put('{task}/update', [TaskController::class, 'update'])->name('update');
        Route::delete('{task}/delete', [TaskController::class, 'destroy'])->name('destroy');

        Route::prefix('attachments')->name('attachment.')->group(function () {
            Route::post('{task}/store', [TaskController::class, 'addAttachment'])->name('store');
            Route::delete('{task}/delete', [TaskController::class, 'deleteAttachment'])->name('delete');
        });
    });

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::post('update', [ProfileController::class, 'update'])->name('update');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
