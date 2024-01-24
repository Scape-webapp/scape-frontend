import React from "react";
import Image from "next/image";
import NoChat from "../../public/images/chatting-animate.svg";
export default function NonChatPage()
{
    return (
      <div className="max-h-screen w-full bg-[#262E35] flex flex-col">
        <div className="flex item-center justify-center">
          <Image src={NoChat} alt="NoChat" />
        </div>
        <h3 className="text-center text-4xl text-white bold ">Let's Chat</h3>
        <p className="text-center text-xl text-white ">
          Search for your friends to start a chat with them
        </p>
      </div>
    );
}