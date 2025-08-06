<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/api/messages', function () {
$messages = DB::table('chat_messages')
->orderBy('sent_at', 'desc')
->limit(50)
->get();

return response()->json($messages);
});

