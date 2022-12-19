import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { io } from 'socket.io-client';

import Home from './pages/HomePage';
import Chat from './pages/ChatPage';
import Error from './pages/ErrorPage';
import './App.css';
import { API_URL } from "./config";

const socket = io(API_URL, { transports: ['websocket'] });
function App() {

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path='/' exact>
            <Home
              socket={socket}
              username={username}
              setUsername={setUsername}
              room={room}
              setRoom={setRoom} />
          </Route>

          <Route path='/chat' exact>
            <Chat
              socket={socket}
              username={username}
              room={room}
            />
          </Route>

          <Route path='*'  >
            <Error />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
