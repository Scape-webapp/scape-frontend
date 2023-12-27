"use client";
import HomePage from "@/components/HomePage";
import Footer from "@/components/Footer";
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
      reciever: "6574bd61378887aeab034740",
      sender: userId,
      text: "yash always critisize poonam",
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
    <div className="min-h-screen">
      <HomePage/>
      <Footer/>
      {/* <p>Login</p>
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
      <button onClick={sendMessage}>Send Message</button> */}
    </div>
  );
}
