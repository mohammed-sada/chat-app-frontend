import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import queryString from 'querystring';

import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const ChatPage = ({ socket, username, room }) => {
    // const { search } = useLocation();
    // const values = queryString.parse(search.slice(1, -1));

    // username = values.username;
    // room = values.room;

    const [roomUsers, setRoomUsers] = useState([]);

    socket.on('listData', ({ room, roomUsers }) => {
        setRoomUsers([...roomUsers]);
    });

    return (
        <div className="chat">
            <Sidebar socket={socket} room={room} users={roomUsers} />
            <Chat
                socket={socket}
                username={username}
                room={room}
            />
        </div>
    );
};

export default ChatPage;
