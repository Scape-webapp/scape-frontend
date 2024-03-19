"use client";

import ChatBox from "@/components/ChatBox";

import LeftSideBar from "@/components/LeftSideBar";
import SideMenu from "@/components/SideMenu";
import { RootState, store } from "@/redux/store";
import { GroupListApi } from "@/services/api.service";
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
  const [userList, setUserList] = useState([]);
  const [socket, setsocket] = useState<any>(undefined);

  const joinChat = async () => {
    const soc = socketIOClient(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
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

  const getGroupChatList = async () => {
    try {
      const list = await GroupListApi(user._id);
      let grpList = list.data;
      grpList.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      grpList = grpList.filter(
        (value: any, index: any, self: any) =>
          index === self.findIndex((t: any) => t._id === value._id)
      );
      
      setUserList(grpList);
    } catch (error) {
      // add fail toast later
      console.log("error in chat list api : ", error);
    }
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
            userList={userList}
            setUserList={setUserList}
            getGroupChatList={getGroupChatList}
          />
          <ChatBox
            socket={socket}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            activeChatRef={activeChatRef}
            setList={setList}
            listRef={listRef}
            groupInfoVisible={groupInfoVisible}
            setgroupInfoVisible={setgroupInfoVisible}
            userList={userList}
            setUserList={setUserList}
            getGroupChatList={getGroupChatList}
          />
        </div>
      </div>
    </AuthComponent>
  );
}
