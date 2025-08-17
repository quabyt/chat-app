<<<<<<< HEAD
Bu proje, Laravel backend, React frontend ve Socket.IO tabanlı WebSocket sunucusundan oluşan gerçek zamanlı bir sohbet uygulamasıdır.
Repo, gerekli migrations dosyaları ve Laravel public klasörüne kopyalanmış React build çıktılarıyla birlikte gelir.
Bu yüzden sıfırdan build veya migration işlemleri için ek ayarlar yapmaya gerek yoktur, yalnızca temel kurulum adımlarını takip etmeniz yeterlidir.
=======
Chat App — Laravel + React + WebSocket + PostgreSQL
>>>>>>> 8b35eeb (docs: kurulum README eklendi, .gitignore güncellendi)

Bu proje üç parçadan oluşur:

<<<<<<< HEAD
PHP 8.1+

Composer
=======
laravel-backend: HTTP API ve statik dosya servis eden Laravel uygulaması

websocket-server: Socket.IO tabanlı sohbet (echo) sunucusu

frontend: React arayüzü (geliştirme sırasında 3000 portu; üretimde build alınıp Laravel tarafından servis edilir)

Tüm sohbet mesajları PostgreSQL veritabanında saklanır. Tek sohbet odası vardır; takma ad (nickname) ile giriş yapılır, takma ad çakışması engellenir, herkes tüm mesajları görür.

Gereksinimler

PHP 8.1+ ve Composer
>>>>>>> 8b35eeb (docs: kurulum README eklendi, .gitignore güncellendi)

Node.js & npm

<<<<<<< HEAD
PostgreSQL

Git

Kurulum Adımları

Backend bağımlılıklarını yükle:

=======
PostgreSQL 13+

Git

Windows için: PHP’de pdo_pgsql ve pgsql eklentileri açık olmalıdır (php.ini içinde extension=pdo_pgsql ve extension=pgsql)

Dizin Yapısı
chat-app/
├─ laravel-backend/      # Laravel API ve üretimde servis edilecek statik dosyalar (public/)
├─ websocket-server/     # Node.js + Socket.IO
└─ frontend/             # React kaynak kodu (geliştirme/build)

Hızlı Kurulum
1) Depoyu klonla
git clone <REPO_URL>
cd chat-app

2) PostgreSQL veritabanını oluştur
CREATE DATABASE chatapp;

3) Laravel backend’i hazırla
>>>>>>> 8b35eeb (docs: kurulum README eklendi, .gitignore güncellendi)
cd laravel-backend

composer install

.env dosyasını oluştur:

cp .env.example .env

<<<<<<< HEAD
.env içinde veritabanı ayarlarını yap:
=======

.env içinde veritabanı bilgilerini düzenle:

APP_ENV=local
APP_KEY=        # Boş bırak, bir sonraki adımda üretilecek
APP_URL=http://localhost:8000
>>>>>>> 8b35eeb (docs: kurulum README eklendi, .gitignore güncellendi)

DB_CONNECTION=pgsql

DB_HOST=127.0.0.1

DB_PORT=5432

DB_DATABASE=chatapp

DB_USERNAME=postgres
<<<<<<< HEAD

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
=======
DB_PASSWORD=parolan


Uygulama anahtarını üret:

php artisan key:generate


Konfigürasyon önbelleğini temizlemek gerekirse:

php artisan config:clear
php artisan cache:clear


Migration’ları çalıştır:

php artisan migrate


Laravel’i başlat:

php artisan serve  # http://localhost:8000

4) WebSocket sunucusunu hazırla

Ayrı bir terminalde:

cd websocket-server
npm install
node index.js      # http://localhost:3001
>>>>>>> 8b35eeb (docs: kurulum README eklendi, .gitignore güncellendi)

node index.js // Sunucu varsayılan olarak http://localhost:3001 adresinde çalışır.

<<<<<<< HEAD
-----------------------------
Tarayıcıdan http://localhost:8000 adresine giderek uygulamayı kullanmaya başlayabilirsin.

Laravel API ve WebSocket server çalışıyor olmalıdır.

-----------------------------
Notlar
React build dosyaları (laravel-backend/public/ altında) ve migrations zaten repo’da mevcut olduğu için npm run build veya migration dosyalarıyla manuel uğraşmaya gerek yoktur.

Eğer frontend kodlarında değişiklik yapılırsa:

cd frontend

npm install
=======
Not: websocket-server/index.js içindeki PostgreSQL bağlantı bilgileri .env yerine dosyada tanımlıysa kendi sisteminize göre güncelleyin.

5) React frontend (geliştirme sırasında)

Ayrı bir terminalde:

cd frontend
npm install
npm start          # http://localhost:3000


Geliştirme akışı:

React’i npm start ile çalıştırabilir, API isteklerini http://localhost:8000’a, Socket.IO’yu http://localhost:3001’e yönlendirebilirsiniz.

CORS hatalarında Laravel config/cors.php → allowed_origins ve WebSocket io({ cors: { origin: ... }}) ayarlarını http://localhost:3000 ve http://localhost:8000 için güncelleyin.
>>>>>>> 8b35eeb (docs: kurulum README eklendi, .gitignore güncellendi)

6) React frontend (üretimde Laravel’den servis)

Güncel arayüzü Laravel’in public/ klasöründen servis etmek için:

cd frontend
npm run build

<<<<<<< HEAD
cp -r build/* ../laravel-backend/public/





=======

Build çıktısını Laravel public/ içine kopyala:

macOS/Linux:

cp -r build/* ../laravel-backend/public/


Windows PowerShell:

Copy-Item -Recurse -Force build\* ..\laravel-backend\public\


Artık tarayıcıdan sadece http://localhost:8000 adresine giderek uygulamayı kullanabilirsiniz.

Sık Karşılaşılan Sorunlar

MissingAppKeyException / APP_KEY yok
cd laravel-backend && php artisan key:generate

PDO/driver bulunamadı (pgsql)
PHP php.ini içinde extension=pdo_pgsql ve extension=pgsql satırlarını etkinleştirin; servisleri/terminali yeniden başlatın.

“no password supplied”
.env içindeki DB_PASSWORD dolu olsun. Değişiklikten sonra php artisan config:clear çalıştırın.

Duplicate table / birden fazla migration aynı tabloyu yaratıyor
Çakışan migration dosyalarını temizleyin veya veriyi saklamanız gerekmiyorsa php artisan migrate:fresh ile sıfırdan kurun.

CORS
Laravel config/cors.php → paths içine api/* ekli olmalı, allowed_origins listesinde http://localhost:3000 ve http://localhost:8000 yer almalı.
WebSocket Server örneğinde cors.origin olarak aynı adresleri tanımlayın.
>>>>>>> 8b35eeb (docs: kurulum README eklendi, .gitignore güncellendi)
