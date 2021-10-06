import React, { useState } from 'react';
import Messages from './Messages';

const Chat = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');


    socket.on('message', (message) => {
        setMessages([...messages, {
            username: message.username,
            text: message.text,
            createdAt: message.createdAt
        }]);
    });
    socket.on('locationMessage', (message) => {
        setMessages([...messages, {
            username: message.username,
            url: message.url,
            createdAt: message.createdAt
        }]);
    });

    const submitMessage = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', message, (error) => {
            if (error) {
                return console.log(error);
            }
        });
    };

    const sendLocation = () => {
        if (!navigator.geolocation) {
            alert('Your browser does not support geolocation, sorry');
        }

        navigator.geolocation.getCurrentPosition((position) => {

            socket.emit('sendLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, (message) => {
                console.log(message);
            });
        });
    };

    return (
        <div className="chat__main">
            <Messages messages={messages} />

            <div className="compose">
                <form id="message-form" onSubmit={submitMessage}>
                    <input
                        name="message"
                        type="text"
                        placeholder="Message"
                        required
                        autoComplete="off"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>

                <button id="send-location" onClick={sendLocation}>Send Location</button>
            </div>
        </div>
    );
};

export default Chat;
