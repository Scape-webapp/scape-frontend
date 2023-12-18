"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";

export default function Home() {
  let socket: Socket;
  const [userId, setuserId] = useState("");
  const [message, setMessage] = useState("");

  const joinChat = async () => {
    socket = socketIOClient("http://localhost:5000", {
      reconnectionDelay: 1000,
      reconnection: true,
      // reconnectionAttemps: 10,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });

    socket.on("msg-recieve", (data) => {
      debugger;
      console.log("object :>> ", data);
    });
  };

  const addUser = async () => {
    await joinChat();
    socket.emit("add-user", {
      id: userId,
    });
  };

  const sendMessage = () => {
    socket.emit("send-msg", {
      reciever: "65742f91faf66f82c43d4269",
      sender: userId,
      text: "tune bola toh galat hi hoga 2",
    });
  };

  useEffect(() => {
    // joinChat();
    return () => {
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <p>Login</p>
      <label>UserName</label>
      <input
        type="text"
        placeholder="userid"
        onChange={(e) => setuserId(e.target.value)}
      />
      <button type="submit" onClick={addUser}>
        Submit
      </button>

      <label>Message</label>
      <textarea onChange={(e) => setMessage(e.target.value)}></textarea>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
