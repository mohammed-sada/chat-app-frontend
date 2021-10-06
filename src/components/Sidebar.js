import React from 'react';

const Sidebar = ({ room, users }) => {
    return (
        <div id="sidebar" className="chat__sidebar">
            <h2 className="room-title">{room}</h2>
            <h3 className="list-title">Users</h3>
            <ul className="users">
                {
                    users.map((user, idx) => {
                        return <li key={idx}>{user.username}</li>;
                    })
                }
            </ul>
        </div>
    );
};

export default Sidebar;
