import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Home = ({ socket, username, room, setUsername, setRoom }) => {
    const [activeRooms, setActiveRooms] = useState([]);

    const history = useHistory();
    const onSubmit = (e) => {
        e.preventDefault();

        socket.emit('join', { username, room }, (error) => {
            if (error) {
                alert(error);
                history.push('/');
            }
        });

        history.push(`/chat?username=${username}&room=${room}`);
    };

    useEffect(() => {
        let isMounted = true;

        socket.on('activeRooms', (rooms) => {
            if (isMounted) {
                setActiveRooms([...rooms]);
                console.log(activeRooms);
            }
        });

        return () => { isMounted = false; }; // cleanup toggles value, if unmounted

    }, [activeRooms, socket]);

    return (
        <div className="centered-form">
            <div className="centered-form__box">
                <h1>Join</h1>
                <form onSubmit={onSubmit} >
                    <input type="text" name="username" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <input type="text" list="rooms" required placeholder="rooms" value={room} onChange={(e) => setRoom(e.target.value)} />
                    <datalist id="rooms">
                        {
                            activeRooms.map((room, idx) => {
                                return <option key={idx}>{room}</option>;
                            })
                        }
                    </datalist>

                    <button type="submit">Join</button>
                </form>
            </div>
        </div>
    );
};

export default Home;
