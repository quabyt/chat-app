Chat App — Laravel + React + WebSocket + PostgreSQL

Gerçek zamanlı sohbet uygulaması:

laravel-backend: HTTP API ve üretimde SPA dosyalarını servis eder.

websocket-server: Socket.IO tabanlı sohbet sunucusu.

frontend: React arayüzü (build alınıp Laravel tarafından servis edilir).

Mesajlar PostgreSQL’de saklanır; tek oda, takma ad kontrolü, tüm kullanıcılara yayın.

Gereksinimler

PHP 8.1+ ve Composer

PHP’de pdo_pgsql ve pgsql eklentileri açık olmalı (Windows: php.ini içinde extension=pdo_pgsql ve extension=pgsql)

Node.js 18+ ve npm

PostgreSQL 13+

Git

Dizin Yapısı

chat-app/

├─ laravel-backend/      # Laravel API ve (build sonrası) statik SPA

├─ websocket-server/     # Socket.IO sunucusu

└─ frontend/             # React kaynak kodu

Kurulum Adımları

1) Depoyu klonla

git clone <REPO_URL>

cd chat-app

2) PostgreSQL veritabanını oluştur

psql veya GUI ile:

CREATE DATABASE chatapp;

3) Laravel backend’i hazırla

cd laravel-backend

composer install

cp .env.example .env


.env dosyasını düzenle:

APP_ENV=local

APP_URL=http://localhost:8000

DB_CONNECTION=pgsql

DB_HOST=127.0.0.1

DB_PORT=5432

DB_DATABASE=chatapp

DB_USERNAME=postgres

DB_PASSWORD=parolan


Uygulama anahtarını üret:

php artisan key:generate


Migration’ları çalıştır:

php artisan migrate


Laravel’i başlat:

php artisan serve   # http://localhost:8000


Not: “Please provide a valid cache path.” hatasında storage/framework/views klasörünü oluşturup php artisan view:clear çalıştırın.

4) WebSocket sunucusunu başlat

Yeni bir terminalde:

cd websocket-server

npm install

node index.js       # http://localhost:3001


Not: websocket-server/index.js içindeki CORS origin listesinde http://localhost:8000 bulunduğundan emin olun (frontend’i Laravel servis edeceği için).

5) React frontend’i derle ve Laravel public’e kopyala

Yeni bir terminalde:

cd frontend

npm install

npm run build


Build çıktısını Laravel public/ içine kopyala:

macOS/Linux:

cp -r build/* ../laravel-backend/public/


Windows PowerShell:

Copy-Item -Recurse -Force build\* ..\laravel-backend\public\


Artık tarayıcıdan şu adrese giderek uygulamayı kullanabilirsin:

http://localhost:8000

Sık Karşılaşılan Sorunlar

APP_KEY hatası

cd laravel-backend && php artisan key:generate

PDO/driver bulunamadı (pgsql)

php.ini içinde extension=pdo_pgsql ve extension=pgsql etkinleştirin; terminali/servisi yeniden başlatın.

“no password supplied”

.env içinde DB_PASSWORD dolu olmalı. Değişiklikten sonra:

php artisan config:clear


Duplicate table

Çakışan migration varsa ve veriyi saklamanız gerekmiyorsa:

php artisan migrate:fresh


CORS

Frontend Laravel’den servis edildiği için WebSocket CORS origin’inde http://localhost:8000 olmalı.

Laravel tarafında config/cors.php → paths içinde api/* bulunduğundan emin olun.

Notlar

Frontend üzerinde değişiklik yaptığında yeniden npm run build al ve çıktıyı Laravel public/ içine tekrar kopyala.
