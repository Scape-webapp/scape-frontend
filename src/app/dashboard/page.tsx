"use client";

import ChatBox from "@/components/ChatBox";
import LeftSideBar from "@/components/LeftSideBar";
import SideMenu from "@/components/SideMenu";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function DashBoard() {
  return (
    <div className="w-screen">
      <div className="w-full flex">
        <SideMenu />
        <LeftSideBar />
        <ChatBox />
      </div>
    </div>
  );
}
