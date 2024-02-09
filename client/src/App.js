import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chats from "./Chats.js";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUserName] = useState();
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const join = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          <input
            type="text"
            placeholder="User..."
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />

          <button onClick={join}>Join a room</button>
        </div>
      ) : (
        <Chats socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
