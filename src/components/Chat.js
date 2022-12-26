import React, { useEffect, useState } from 'react';
import { API_URL } from "../config";
import Messages from './Messages';
import Spinner from "./Spinner";

const Chat = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [loadingMessages, setLoadingMessages] = useState(true);

    async function getMessages() {
        try {
            const res = await fetch(`${API_URL}/messages`);
            const messages = await res.json();

            const promises = messages.map(async (messageId) => {
                return (await fetch(`${API_URL}/message?id=${messageId}`)).json();
            });

            Promise.all(promises).then(messages => {
                messages.sort((a, b) => a.createdAt - b.createdAt);
                setMessages(messages);
                setLoadingMessages(false);
            });

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getMessages();
    }, []);


    socket.on('message', (message) => {
        setMessages([...messages, {
            username: message.username,
            text: message.text,
            cipher: message.cipher,
            createdAt: message.createdAt
        }]);
        const objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    });
    socket.on('locationMessage', (message) => {
        setMessages([...messages, {
            username: message.username,
            url: message.url,
            createdAt: message.createdAt
        }]);
    });

    const submitMessage = (cipherType = "hill") => {
        socket.emit('sendMessage', {
            message,
            cipherType
        }, (error) => {
            if (error) {
                return console.log(error);
            }
            setMessage('');
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
            {loadingMessages ?
                <div className="loading">
                    <Spinner />
                </div>
                : null}
            <Messages messages={messages} />
            <div className="compose">
                <form id="message-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        disabled={loadingMessages}
                        name="message"
                        type="text"
                        placeholder="Message"
                        required
                        autoComplete="off"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button
                        disabled={loadingMessages}
                        type="button" onClick={() => submitMessage("hill")}>Hill</button>
                    <button
                        disabled={loadingMessages}
                        type="button" onClick={() => submitMessage("des")}>DES</button>
                </form>

                {/* <button id="send-location" onClick={sendLocation}>Send Location</button> */}
            </div>
        </div>
    );
};

export default Chat;
