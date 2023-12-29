import React from "react";
import Image from "next/image";
import scapeWhiteLogo from "../../public/logos/scape_logo_white.svg";
import SideImage from "../../public/images/homepage.svg";
import ScreenMobile from "../../public/images/screen2.svg";
import GroupChat from "../../public/images/group-chat-animate.svg";
import GroupChatPeople from "../../public/images/group-chat.svg";
import ChatPage from "../../public/images/chatPage.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();
  return (
    <div className="">
      <div className="h-screen bg-[#7083FF]  px-5 md:px-20">
        <div className="py-8 flex justify-between items-center">
          <div className="text-white text-2xl md:text-3xl flex font-bold text-center items-center gap-3">
            <Image
              src={scapeWhiteLogo}
              alt="logo_white"
              width={40}
              height={40}
            />
            Scape
          </div>
          <div className="float-end">
            <button
              onClick={() => router.push("/login")}
              className="bg-[#ffffff] rounded-[50px] px-10 py-3 font-bold cursor-pointer shadow-md hover:bg-[#343A40] hover:text-white"
            >
              Login
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="py-10">
              <h1 className="text-3xl md:text-5xl text-center md:text-left font-bold text-white mb-10">
                A Place to make friends & mates
              </h1>
              <h3 className="text-xl text-center md:text-left md:text-2xl text-[#343A40] font-semibold mb-10">
                Infinite Conversations & Connections to form a Scape community
              </h3>
              <button className="bg-[#ffffff]  hover:bg-[#343A40] hover:text-white flex items-center gap-4 focus:ring rounded-[20px] px-8 py-2 font-bold cursor-pointer shadow-md">
                <FontAwesomeIcon icon={faPaperPlane} size="lg" bounce />
                Let's Chat
              </button>
            </div>
          </div>
          <div className="hidden md:block m-auto">
            <Image src={SideImage} alt="SideImage" width={500} height={500} />
          </div>
        </div>
      </div>
      {/* next viewpot */}
      <div className="h-screen px-5 md:px-20 pt-10">
        <div className="grid md:grid-cols-2">
          <div className="flex items-center justify-center">
            <Image
              src={ScreenMobile}
              alt="ScreenMobile"
              width={500}
              height={500}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="md:px-10">
              <h1 className="text-2xl md:text-3xl font-semibold pb-8">
                What Makes Scape Stand Out?
              </h1>
              <h3 className="md:text-2xl text-sm">
                Scape is a cutting-edge chat application that brings people
                together through intuitive and dynamic communication features.
                Whether you're connecting with friends, colleagues, or creating
                communities, Scape provides a platform where your conversations
                come to life.
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen px-5 md:px-20 pt-10 bg-[#F6F6F6]">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="md:px-10">
              <h1 className="text-2xl md:text-3xl font-semibold pb-8">
                Group Chats for Collaborative Conversations
              </h1>
              <h3 className="text-sm md:text-2xl">
                Bring your community or team together in one place with our
                robust group chat feature. Collaborate on projects, plan events,
                or just catch up with friends – all within the convenience of a
                group chat.
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image src={GroupChat} alt="GroupChat" width={500} height={500} />
          </div>
        </div>
      </div>
      {/* next viewpot */}
      <div className="h-screen px-5 md:px-20 pt-10 ">
        <div className="grid md:grid-cols-2">
          <div className="flex items-center justify-center">
            <Image
              src={GroupChatPeople}
              alt="GroupChatPeople"
              width={500}
              height={500}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="md:px-10">
              <h1 className="text-2xl md:text-3xl font-semibold pb-8">
                Instant Messaging, Anytime, Anywhere
              </h1>
              <h3 className="text-sm md:text-2xl">
                Scape offers real-time messaging, enabling you to stay connected
                with your contacts no matter where you are. Share messages,
                emojis, and multimedia effortlessly for a truly dynamic chat
                experience.
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen px-5 md:px-20 pt-10 bg-[#F6F6F6]">
        <div className="flex justify-center items-center py-10">
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold pb-8 text-center">
              RELIABLE TECH FOR STAYING CLOSE
            </h1>
            <h3 className="text-sm md:text-2xl pb-8 text-center">
              Navigate Scape effortlessly, whether you're a tech enthusiast or a
              casual user
            </h3>
            <Image
              className="m-auto"
              src={ChatPage}
              alt="GroupChatPeople"
              width={900}
              height={800}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
