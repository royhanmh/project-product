<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;

Route::apiResource('products', ProductController::class);
