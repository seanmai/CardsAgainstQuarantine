import React, { useState } from 'react';
import socketIO from 'socket.io-client';

// const socket = socketIO('https://localhost:4000');
const messages = ['hello', 'test', 'test123'];

const Chat = () => {

    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {setMessage(e.target.value)};

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
    };

    const receiveMessage = () => {
        
    }

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