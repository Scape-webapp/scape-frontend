"use client";

import ChatBox from "@/components/ChatBox";
import LeftSideBar from "@/components/LeftSideBar";
import SideMenu from "@/components/SideMenu";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import socketIOClient, { Socket, io } from "socket.io-client";

export default function DashBoard() {
  enum activeBar {
    CHAT = "chat",
    GROUPCHAT = "groupChat",
    PROFILE = "profile",
    SETTING = "setting",
  }
  const [activeTab, setActiveTab] = useState<activeBar>(activeBar.CHAT);
  let sender = "6574bd61378887aeab034740";
  let receiver = "6574b5dcb558663da9b3e808";
  // let socket: any;
  const [socket, setsocket] = useState<any>(undefined);

  const addUser = async () => {
    debugger;
    await socket.emit("add-user", {
      id: sender,
    });
  };

  const joinChat = async () => {
    const soc = io("http://localhost:4000", {
      reconnectionDelay: 1000,
      reconnection: true,
      // reconnectionAttemps: 10,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });

    setsocket(soc);

    // if (socket) {
    soc.emit("add-user", {
      id: sender,
    });
    soc.on("msg-recieve", (data: any) => {
      console.log("object :>> ", data);
    });
    // console.log("socket :>> ", socket);
    // }
  };

  // const sendMessage = async (e: any, message: any) => {
  //   e.preventDefault();
  //   debugger;
  //   // if (socket) {
  //   await socket.emit("send-msg", {
  //     reciever: [reciever],
  //     sender: sender,
  //     text: message,
  //   });
  //   // }
  // };

  useEffect(() => {
    joinChat();
  }, []);

  // useEffect(() => {
  //   if (socket) {
  //     addUser();
  //     socket.on("msg-recieve", (data: any) => {
  //       console.log("object :>> ", data);
  //     });
  //   }
  //   console.log("socket :>> ", socket);
  // }, [socket]);

  return (
    <div className="">
      <div className="w-full flex">
        <SideMenu setActiveTab={setActiveTab} activeTab={activeTab} />
        <LeftSideBar activeTab={activeTab} />
        <ChatBox socket={socket} />
      </div>
    </div>
  );
}
