import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3001");

function App() {
  const [nickname, setNickname] = useState('');
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const messagesEndRef = useRef(null);
  const initialMessagesLoaded = useRef(false);

  // Kullanıcı katıldıktan sonra mesajları çek
  useEffect(() => {
    console.log("Geçmiş mesajlar çekiliyor...");
    fetch("http://localhost:8000/api/messages")
        .then((res) => res.json())
        .then((data) => {
          const formatted = data.reverse().map((msg) => ({
            nickname: msg.nickname,
            message: msg.message,
          }));
          setMessages(formatted);
          initialMessagesLoaded.current = true;
        })
        .catch((err) => console.error("Mesajlar alınamadı:", err));
  }, []);



  // WebSocket olayları
  useEffect(() => {
    socket.on('join-error', (msg) => {
      alert(msg);
      setNickname('');
      setJoined(false);
    });

    socket.on('user-joined', (nick) => {
      setMessages((prev) => [...prev, { nickname: 'SYSTEM', message: `${nick} katıldı` }]);
      if (nick === nickname) setJoined(true);
    });

    socket.on('user-left', (nick) => {
      setMessages((prev) => [...prev, { nickname: 'SYSTEM', message: `${nick} ayrıldı` }]);
    });

    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('user-list', (users) => {
      setUserList(users);
    });

    return () => {
      socket.off('join-error');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('message');
      socket.off('user-list');
    };
  }, [nickname]);

  // Scroll'u sona al
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoin = () => {
    if (nickname.trim()) {
      socket.emit('join', nickname);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
      <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial' }}>
        {!joined ? (
            <div style={{ margin: 'auto' }}>
              <h2>Takma ad gir</h2>
              <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Takma ad"
              />
              <button onClick={handleJoin} style={{ marginLeft: 10 }}>Katıl</button>
            </div>
        ) : (
            <>
              {/* Kullanıcı listesi */}
              <div style={{
                width: 200,
                borderRight: '1px solid #ccc',
                padding: 10,
                backgroundColor: '#f9f9f9'
              }}>
                <h4>Katılımcılar</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {userList.map((user, i) => (
                      <li key={i} style={{ padding: '4px 0', fontWeight: user === nickname ? 'bold' : 'normal' }}>
                        {user === nickname ? `${user} (Sen)` : user}
                      </li>
                  ))}
                </ul>
              </div>

              {/* Sohbet alanı */}
              <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column' }}>
                <h2>Merhaba, {nickname}</h2>
                <div style={{
                  flex: 1,
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  padding: 10,
                  overflowY: 'auto',
                  marginBottom: 10,
                  backgroundColor: '#fff'
                }}>
                  {messages.map((m, i) => (
                      <div key={i} style={{ marginBottom: 4 }}>
                        <strong>{m.nickname}:</strong> {m.message}
                      </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div style={{ display: 'flex' }}>
                  <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Mesaj yaz..."
                      style={{ flex: 1, marginRight: 10 }}
                  />
                  <button onClick={handleSend}>Gönder</button>
                </div>
              </div>
            </>
        )}
      </div>
  );
}

export default App;
