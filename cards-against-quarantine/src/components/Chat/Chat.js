import React, { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';

const socket = socketIO('http://localhost:4000');

const Chat = () => {
    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleMessageChange = (e) => {setMessage(e.target.value)};

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {};
        data.gameId = '';
        data.username = '';
        data.message = message;
        socket.emit("message", data);
        setMessage('');
    };

    // const receiveMessage = () => {
        
    // }

    // NOTE TO ANDY:
    // In routes/game.js, change
    // socket.to(data.gameId).emit('message-broadcast', data);
    // to
    // socket.emit('message-broadcast', data);
    // if you want to test. we currently do not have it joined per room so.
    useEffect(() => {
        socket.on('message-broadcast', data => {
            setMessages([...messages, data.message]);
        });
    }, [messages]);

    console.log("message");
    console.log(message);
    console.log("messages");
    console.log(messages);

    return (
        <div id="chat-container">
            <div id="messages-container">
                <div className="message">
                    {messages.map((message) => {
                        return <p key={message}>{message}</p>
                    })}
                </div>
            </div>
            <form id="chat-box" onSubmit={handleSubmit}>
                <input 
                    value={message} 
                    placeholder="Type a message..." 
                    id="m" 
                    autoComplete="off" 
                    onChange={handleMessageChange}
                />
                <input type="submit" value="Send"/>
            </form>
        </div>
    );
}

export default Chat;