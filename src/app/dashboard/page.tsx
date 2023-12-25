"use client";

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

        <div className="w-full bg-[#262E35] flex flex-col">
          <div className="h-[10%] border-b border-[#36404A] flex items-center py-2 px-8">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/profile-dummy.svg"
                  alt="profile"
                  height={45}
                  width={45}
                />
                <p className="text-xl font-medium text-white">Alice</p>
                <div className="bg-[#2CAC39] h-3 w-3 rounded-full" />
              </div>
              <FontAwesomeIcon icon={faEllipsisV} size="xl" color="#787E83" />
            </div>
          </div>

          <div className="h-[80%] border-b border-[#36404A]"></div>

          <div className="h-[10%] flex items-center px-6 w-full gap-8">
            <FontAwesomeIcon icon={faFaceSmile} size="lg" color="#7083FF" />
            <div className="flex p-1.5 justify-between items-center bg-[#36404A] rounded-xl w-3/4">
              <input
                type="text"
                className="px-2 py-1 w-full text-white focus:outline-none bg-transparent placeholder:text-[#A0A0A0]"
                placeholder="Type a Message"
              />
              <Image src="/logos/send.svg" alt="send" height={40} width={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
