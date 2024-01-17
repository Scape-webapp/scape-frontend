"use client";

import ChatBox from "@/components/ChatBox";
import LeftSideBar from "@/components/LeftSideBar";
import SideMenu from "@/components/SideMenu";
import { RootState } from "@/redux/store";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socketIOClient, { Socket, io } from "socket.io-client";

export default function DashBoard() {
  enum activeBar {
    CHAT = "chat",
    GROUPCHAT = "groupChat",
    PROFILE = "profile",
    SETTING = "setting",
  }
  const [activeTab, setActiveTab] = useState<activeBar>(activeBar.CHAT);
  const user = useSelector((state: RootState) => state.user.user);
  const [activeChat, setActiveChat] = useState({
    id: "",
    user_name: "",
  });

  // let sender = user._id;
  // let receiver =
  //   sender === "6592b777df6b5412b578b2ba"
  //     ? "6592bb58df6b5412b578b2c1"
  //     : "6592b777df6b5412b578b2ba";
  // let socket: any;
  const [socket, setsocket] = useState<any>(undefined);

  // const addUser = async () => {
  //   debugger;
  //   await socket.emit("add-user", {
  //     id: sender,
  //   });
  // };

  const joinChat = async () => {
    const soc = io("http://localhost:5000", {
      reconnectionDelay: 1000,
      reconnection: true,
      // reconnectionAttemps: 10,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });

    setsocket(soc);

    soc.emit("add-user", {
      id: user._id,
    });
  };

  useEffect(() => {
    joinChat();
    return () => {
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className="">
      <div className="w-full flex">
        <SideMenu setActiveTab={setActiveTab} activeTab={activeTab} />
        <LeftSideBar
          activeTab={activeTab}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
        <ChatBox socket={socket} activeChat={activeChat} />
      </div>
    </div>
  );
}
