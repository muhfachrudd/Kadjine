<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\OrderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public API routes for restaurant ordering system
Route::prefix('menu')->group(function () {
    Route::get('/categories', [MenuController::class, 'categories']);
    Route::get('/items', [MenuController::class, 'menuItems']);
    Route::get('/categories/{categoryId}/items', [MenuController::class, 'menuItemsByCategory']);
});

Route::prefix('orders')->group(function () {
    Route::post('/', [OrderController::class, 'store']);
    Route::get('/{id}', [OrderController::class, 'show']);
});
