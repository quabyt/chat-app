<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            $table->string('nickname');           // Gönderen kullanıcı takma adı
            $table->text('message');              // Mesaj içeriği
            $table->timestamp('sent_at');         // Gönderim zamanı (Node.js tarafından gönderilecek)
            $table->timestamps();                 // created_at & updated_at
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
    }
};
