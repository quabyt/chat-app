<?php

use Illuminate\Support\Facades\Route;

Route::get('/chat', function () {
    return file_get_contents(public_path('index.html'));
});

