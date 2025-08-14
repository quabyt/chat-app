Bu proje, Laravel backend, React frontend ve Socket.IO tabanlı WebSocket sunucusundan oluşan gerçek zamanlı bir sohbet uygulamasıdır.
Repo, gerekli migrations dosyaları ve Laravel public klasörüne kopyalanmış React build çıktılarıyla birlikte gelir.
Bu yüzden sıfırdan build veya migration işlemleri için ek ayarlar yapmaya gerek yoktur, yalnızca temel kurulum adımlarını takip etmeniz yeterlidir.

1. Gereksinimler

PHP 8.1+

Composer

Node.js & npm

PostgreSQL

Git

Kurulum Adımları

Backend bağımlılıklarını yükle:

cd laravel-backend

composer install

.env dosyasını oluştur:

cp .env.example .env

.env içinde veritabanı ayarlarını yap:

DB_CONNECTION=pgsql

DB_HOST=127.0.0.1

DB_PORT=5432

DB_DATABASE=chatapp

DB_USERNAME=postgres

DB_PASSWORD=parolan

PostgreSQL üzerinde chatapp isimli boş veritabanını oluştur.

Migration çalıştır:

php artisan migrate

(Migration dosyaları ve React build zaten repo’da mevcut olduğu için ek işlem gerekmez.)

Laravel’i çalıştır:

php artisan serve //Laravel API ve frontend artık http://localhost:8000 adresinde çalışır.
-----------------------------
WebSocket Sunucusunu Çalıştırma

WebSocket klasörüne gir:

cd websocket-server

Node bağımlılıklarını yükle:

npm install

WebSocket sunucusunu başlat:

node index.js // Sunucu varsayılan olarak http://localhost:3001 adresinde çalışır.

-----------------------------
Tarayıcıdan http://localhost:8000 adresine giderek uygulamayı kullanmaya başlayabilirsin.

Laravel API ve WebSocket server çalışıyor olmalıdır.

-----------------------------
Notlar
React build dosyaları (laravel-backend/public/ altında) ve migrations zaten repo’da mevcut olduğu için npm run build veya migration dosyalarıyla manuel uğraşmaya gerek yoktur.

Eğer frontend kodlarında değişiklik yapılırsa:

cd frontend

npm install

npm run build

cp -r build/* ../laravel-backend/public/





