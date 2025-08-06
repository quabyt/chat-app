<?php

use Illuminate\Support\Facades\Route;

// API yönlendirmeleri ayrı tutulur
Route::middleware('api')->group(function () {
    require __DIR__.'/api.php';
});

// React frontend için tek sayfa uygulama yönlendirmesi (SPA)
Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');
