const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Client } = require('pg');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"]
    }
});

// PostgreSQL bağlantısı
const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'chatapp',
    password: '121212',
    port: 5432,
});

db.connect()
    .then(() => console.log('PostgreSQL bağlantısı başarılı'))
    .catch((err) => console.error('PostgreSQL bağlantı hatası:', err.stack));

// Takma adları sakla
const nicknames = new Set();

// Kullanıcı listesini gönderme fonksiyonu
const emitUserList = () => {
    io.emit('user-list', Array.from(nicknames));
};

io.on('connection', (socket) => {
    console.log('Yeni bağlantı:', socket.id);

    socket.on('join', (nickname) => {
        if (nicknames.has(nickname)) {
            socket.emit('join-error', 'Bu kullanıcı adı zaten kullanılıyor.');
            return;
        }

        socket.nickname = nickname;
        nicknames.add(nickname);
        console.log(`${nickname} sohbete katıldı.`);
        socket.emit('user-list', Array.from(nicknames)); // sadece bağlanan kişiye
        io.emit('user-joined', nickname); // herkese katıldı mesajı
        io.emit('user-list', Array.from(nicknames)); // herkese güncel liste
        emitUserList(); // Tüm istemcilere listeyi gönder
    });

    socket.on('message', (msg) => {
        const time = new Date();

        db.query(
            'INSERT INTO chat_messages (nickname, message, sent_at, created_at, updated_at) VALUES ($1, $2, $3, $4, $4)',
            [socket.nickname, msg, time, time]
        )
            .then(() => {
                console.log(`[DB] Mesaj eklendi: ${socket.nickname}: ${msg}`);
            })
            .catch((err) => {
                console.error(`[DB HATA] Mesaj eklenemedi: ${err.message}`);
            });

        const mesajObjesi = {
            nickname: socket.nickname,
            message: msg,
            time,
        };

        io.emit('message', mesajObjesi);
    });

    socket.on('disconnect', () => {
        if (socket.nickname) {
            nicknames.delete(socket.nickname);
            console.log(`${socket.nickname} ayrıldı.`);

            io.emit('user-left', socket.nickname);
            emitUserList(); // Güncel kullanıcı listesini gönder
        }
    });
});

server.listen(3001, () => {
    console.log('WebSocket sunucusu çalışıyor: http://localhost:3001');
});
