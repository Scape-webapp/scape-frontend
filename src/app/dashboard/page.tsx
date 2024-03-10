"use client";

import ChatBox from "@/components/ChatBox";
import GroupInfo from "@/components/GroupInfo";
import LeftSideBar from "@/components/LeftSideBar";
import SideMenu from "@/components/SideMenu";
import { RootState, store } from "@/redux/store";
import { AuthComponent } from "@/utils/auth";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import socketIOClient, { io } from "socket.io-client";

export default function DashBoard() {
  enum activeBar {
    CHAT = "chat",
    GROUPCHAT = "groupChat",
    PROFILE = "profile",
    SETTING = "setting",
  }
  // const [activeTab, setActiveTab] = useState<activeBar>(activeBar.CHAT);
  const activeTab = useSelector((state: RootState) => state.activeTab.tabValue);
  const user = useSelector((state: RootState) => state.user.user);
  const [groupInfoVisible, setgroupInfoVisible] = useState(false);
  const [activeChat, setActiveChat] = useState({
    id: "",
    user_name: "",
    profile_image: "",
    group_chat: false,
  });
  const activeChatRef = useRef(activeChat);
  const [list, setList] = useState<any>([]);
  const listRef = useRef(list);

  const [socket, setsocket] = useState<any>(undefined);

  const joinChat = async () => {
    const soc = socketIOClient("http://localhost:5000", {
      reconnectionDelay: 1000,
      reconnection: true,
      // reconnectionAttemps: 10,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
      withCredentials: true,
      auth: {
        token: store.getState().user.accessToken,
      },
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
    <AuthComponent>
      <div className="">
        <div className="w-full flex">
          <SideMenu />
          <LeftSideBar
            list={list}
            setList={setList}
            listRef={listRef}
            activeChatRef={activeChatRef}
            setActiveChat={setActiveChat}
            setgroupInfoVisible={setgroupInfoVisible}
            socket={socket}
          />
          <ChatBox
            socket={socket}
            activeChat={activeChat}
            activeChatRef={activeChatRef}
            list={list}
            setList={setList}
            listRef={listRef}
            groupInfoVisible={groupInfoVisible}
            setgroupInfoVisible={setgroupInfoVisible}
          />
        </div>
      </div>
    </AuthComponent>
  );
}
