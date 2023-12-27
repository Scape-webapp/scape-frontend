"use client";

import ChatBox from "@/components/ChatBox";
import LeftSideBar from "@/components/LeftSideBar";
import SideMenu from "@/components/SideMenu";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function DashBoard() {
  enum activeBar {
    CHAT = "chat",
    GROUPCHAT = "groupChat",
    PROFILE = "profile",
    SETTING = "setting",
  }
  const [activeTab, setActiveTab] = useState<activeBar>(activeBar.CHAT);
  return (
    <div className="">
      <div className="w-full flex">
        <SideMenu setActiveTab={setActiveTab} activeTab={activeTab} />
        <LeftSideBar activeTab={activeTab} />
        <ChatBox />
      </div>
    </div>
  );
}
