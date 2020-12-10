import React, { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import './Chat.css';
const socket = socketIO('http://localhost:4000');

const Chat = () => {
    
    const [message, setMessage] = useState('');

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

    // NOTE TO ANDY:
    // In routes/game.js, change
    // socket.to(data.gameId).emit('message-broadcast', data);
    // to
    // socket.emit('message-broadcast', data);
    // if you want to test. we currently do not have it joined per room so.
    useEffect(() => {
        socket.on('message-broadcast', data => {
            let newMessage = document.createElement("P");
            newMessage.innerText = data.message;
            document.querySelector("#messages").appendChild(newMessage);
        });
    }, []);

    return (
        <div id="chat-container">
            <div id="messages-container">
                <div id="messages">

                </div>
            </div>
            <form id="chat-box" onSubmit={handleSubmit}>
                <input 
                    value={message} 
                    placeholder="Type a message..." 
                    id="type-input" 
                    autoComplete="off" 
                    onChange={handleMessageChange}
                />
                <input id="send-button" type="submit" value="Send"/>
            </form>
        </div>
    );
}

export default Chat;