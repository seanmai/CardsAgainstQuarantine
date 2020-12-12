import React, { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import './Chat.css';
import { connect, useSelector } from 'react-redux';
import {socket} from "../../socket.js";

const Chat = (props) => {
    const username = useSelector(state => state.currentUser.name);
    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {setMessage(e.target.value)};

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {};
        data.gameId = props.gameId;
        data.username = username;
        data.message = message;
        socket.emit('message', data);
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
            console.log("getting a message");
            document.querySelector('#messages').innerHTML += "<p><strong>" + data.username + ": </strong>" + data.message + "</p>";
            let messagesContainer = document.querySelector('#messages-container');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }, []);

    return (
        <div id="chat-container">
            <h1>Chat</h1>
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