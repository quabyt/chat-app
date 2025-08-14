Bu proje; Laravel API, React frontend ve Node.js WebSocket server kullanılarak gerçek zamanlı bir sohbet uygulaması olarak geliştirilmiştir. Mesajlar PostgreSQL veritabanında saklanır ve sayfa yenilense bile kaybolmaz.

1. Gereksinimler

PHP 8.2+

Composer (Laravel için)

Node.js 18+ ve npm

PostgreSQL 14+

Git

2. Kurulum
2.1. Repoyu klonla
git clone <repo-url>
cd chat-app

2.2. Laravel backend kurulum
cd laravel-backend
composer install
cp .env.example .env
php artisan key:generate


.env dosyasını aç ve veritabanı ayarlarını düzenle:

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=chatapp
DB_USERNAME=postgres
DB_PASSWORD=parola

3. Veritabanı
3.1. Veritabanını oluştur

PostgreSQL terminalinde:

CREATE DATABASE chatapp;

3.2. Migration ile tablo oluştur
php artisan make:migration create_chat_messages_table --create=chat_messages


Migration dosyasına şu yapıyı ekle:

public function up(): void
{
    Schema::create('chat_messages', function (Blueprint $table) {
        $table->id();
        $table->string('nickname');
        $table->text('message');
        $table->timestamp('sent_at');
        $table->timestamps();
    });
}


Ardından migration çalıştır:

php artisan migrate

4. WebSocket Server Kurulumu
4.1. Node.js paketlerini yükle
cd ../websocket-server
npm install

4.2. WebSocket server başlat
node index.js


Bu sunucu localhost:3001 portunda çalışır.

5. React Frontend
5.1. Geliştirme modunda çalıştırma
cd ../frontend
npm install
npm start


Bu modda frontend localhost:3000 üzerinden çalışır.

5.2. Laravel ile entegre çalıştırma

React uygulamasını build et:

npm run build


Build çıktısını Laravel public klasörüne kopyala:

cp -r build/* ../laravel-backend/public/


Artık Laravel çalıştığında frontend de localhost:8000 üzerinden açılır.

6. Laravel Çalıştırma
cd ../laravel-backend
php artisan serve


Laravel API localhost:8000 adresinde çalışır.

7. Kullanım

WebSocket server (node index.js) çalışır durumda olmalı.

Laravel API (php artisan serve) çalışır durumda olmalı.

React frontend geliştirme modunda (npm start) veya build edilip Laravel public klasöründe bulunmalı.

Tarayıcıdan uygulamayı aç, takma ad girerek sohbete katıl.

8. API Endpoint’leri
Method	URL	Açıklama
GET	/api/messages	Son 50 mesajı döndürür
9. Notlar

CORS ayarları laravel-backend/config/cors.php içinde düzenlenebilir.

Route tanımları laravel-backend/routes/web.php ve laravel-backend/routes/api.php içinde yer alır.

Laravel’de SPA yönlendirmesi şu yapı ile sağlanır:

Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');
