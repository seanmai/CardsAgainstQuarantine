import React from 'react';
import socketIO from 'socket.io-client';
import ChatBox from '../ChatBox/ChatBox';

// const socket = socketIO('https://localhost:4000');
const messages = ['hello', 'test', 'test123'];

const Chat = () => {

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
            <ChatBox />
        </div>
    );
}

export default Chat;