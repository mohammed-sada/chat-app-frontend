import React from 'react';
import moment from 'moment';

const Messages = ({ messages }) => {
    return (
        <div id="messages" className="chat__messages">
            {messages.length > 0 ?
                messages.map((message, idx) => {
                    return <div className="message" key={idx}>
                        <p>
                            <span className="message__name">{message.username}</span>
                            <span className="message__meta">{moment(message.createdAt).format('h:mm a')}</span>
                        </p>
                        <p>{message.text}</p>
                        <p className="cipher__text">{message.cipher}</p>
                    </div>;
                })
                : <p className="no__messages">no messages yet</p>}
        </div>
    );
};

export default Messages;
