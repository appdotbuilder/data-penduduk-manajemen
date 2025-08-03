<?php

use App\Http\Controllers\ResidentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('residents.index');
    }
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('residents.index');
    })->name('dashboard');
    
    // Residents resource routes
    Route::resource('residents', ResidentController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
