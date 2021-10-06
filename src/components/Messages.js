import React from 'react';
import moment from 'moment';

const Messages = ({ messages }) => {
    return (
        <div id="messages" className="chat__messages">
            {
                messages.map((message, idx) => {
                    return <div className="message" key={idx}>
                        <p>
                            <span className="message__name">{message.username}</span>
                            <span className="message__meta">{moment(message.createdAt).format('h:mm a')}</span>
                        </p>
                        <p>
                            {message.text ? (message.text) : (<a href={message.url} target="_blank" rel="noreferrer"> My current location 💣</a>)}
                        </p>
                    </div>;
                })
            }
        </div>
    );
};

export default Messages;
