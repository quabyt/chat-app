Bu proje, Laravel tabanlı bir backend API, Node.js WebSocket sunucusu ve React tabanlı bir frontend ile gerçek zamanlı sohbet uygulamasıdır. Mesajlar PostgreSQL veritabanında saklanır.

Gereksinimler

PHP 8.2+

Composer

Node.js 18+

npm veya yarn

PostgreSQL 14+

Git

Kurulum Adımları
1. Depoyu Klonla
git clone <repo-url>
cd chat-app

2. Laravel Backend Kurulumu
cd laravel-backend
composer install


.env dosyasını oluştur ve veritabanı ayarlarını yap:

cp .env.example .env


.env içinde aşağıdaki alanları güncelle:

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=chatapp
DB_USERNAME=postgres
DB_PASSWORD=parolan


Veritabanını oluştur ve migration çalıştır:

php artisan migrate


Laravel server'ı başlat:

php artisan serve --port=8000


Artık API http://localhost:8000 üzerinden çalışacaktır.

3. WebSocket Sunucusu Kurulumu
cd ../websocket-server
npm install


index.js içinde PostgreSQL bağlantı bilgilerini düzenle:

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'chatapp',
    password: 'parolan',
    port: 5432,
});


WebSocket sunucusunu başlat:

node index.js


Artık WebSocket sunucusu http://localhost:3001 üzerinde çalışacaktır.

4. React Frontend Kurulumu
cd ../frontend
npm install


Geliştirme modunda çalıştırmak için:

npm start


Production için build almak ve Laravel public dizinine kopyalamak:

npm run build
cp -r build/* ../laravel-backend/public/

Kullanım

Backend (Laravel): php artisan serve --port=8000

WebSocket Server (Node.js): node index.js

Frontend: Tarayıcıdan http://localhost:8000 adresine git

Kullanıcı bir takma ad girerek sohbete katılır. Gönderilen mesajlar hem diğer kullanıcılara iletilir hem de PostgreSQL veritabanında saklanır. Sayfa yenilendiğinde geçmiş mesajlar otomatik olarak API üzerinden çekilir.

API Uç Noktaları

GET /api/messages → Son 50 mesajı döndürür (JSON formatında)

