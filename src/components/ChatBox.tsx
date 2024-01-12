"use client";
import { faEllipsisV, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import socketIOClient, { Socket, io } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const ChatBox = ({ socket }: any) => {
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const chatBox = useRef<any>(null);
  const user = useSelector((state: RootState) => state.user.user);
  let sender = user._id;
  let receiver =
    sender === "6592b777df6b5412b578b2ba"
      ? "6592bb58df6b5412b578b2c1"
      : "6592b777df6b5412b578b2ba";

  const getMSgs = async () => {
    const msgs = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/message/history`,
      {
        receiver: [receiver],
        sender: sender,
      }
    );
    setChatMessages(msgs.data);
    let rawMsgs = [...msgs.data];
    console.log(rawMsgs);
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    let msgToSend = {
      receiver: [receiver],
      sender: sender,
      text: message,
    };
    await socket.emit("send-msg", msgToSend);
    setChatMessages((prevMessages: any) => [
      ...prevMessages,
      {
        ...msgToSend,
        createdAt: moment().toISOString(),
      },
    ]);
    setMessage("");
    setPickerVisible(false);
  };

  useEffect(() => {
    if (chatBox) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    getMSgs();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("msg-receive", (data: any) => {
        setChatMessages((prev: any) => [...prev, data]);
      });
    }
    return () => {
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
      }
    };
  }, [socket]);

  const handleEmojiSelect = (emoji:any) => {
   setSelectedEmojis((prevEmojis) => [...prevEmojis, emoji.native]);
    setMessage((prevMessage) => prevMessage + emoji.native);
  };

  const handleIconClick = () => {
    setPickerVisible(!pickerVisible);
  };

  return (
    <div className="max-h-screen w-full bg-[#262E35] flex flex-col">
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

      <div className="h-[80%] border-b overflow-x-auto border-[#36404A] p-6">
        <div
          ref={chatBox}
          className="h-full w-full overflow-y-scroll overflow-x-hidden"
        >
          {/* Messages */}
          {chatMessages.map((msg: any, i: any) => (
            <div key={i}>
              {moment.utc(msg.createdAt).format("LL") ===
                moment().format("LL") &&
              moment.utc(msg.createdAt).format("LL") !==
                moment.utc(chatMessages[i - 1]?.createdAt).format("LL") ? (
                <div className="flex items-center mb-3 justify-center">
                  <div className="py-1 px-3 flex rounded justify-center bg-[#36404A]">
                    <p className="text-sm text-white">Today</p>
                  </div>
                </div>
              ) : moment.utc(msg.createdAt).format("LL") !==
                  moment.utc(chatMessages[i - 1]?.createdAt).format("LL") &&
                moment.utc(msg.createdAt).format("LL") !==
                  moment().format("LL") ? (
                moment.utc(msg.createdAt).format("LL") ===
                moment().subtract(1, "day").format("LL") ? (
                  <div className="flex items-center mb-3 justify-center">
                    <div className="py-1 px-3 flex rounded justify-center bg-[#36404A]">
                      <p className="text-sm text-white">Yesterday</p>
                    </div>
                  </div> // <div>{new Date(msg.createdAt).toLocaleDateString()}</div>
                ) : (
                  <div className="flex items-center mb-3 justify-center">
                    <div className="py-1 px-3 flex rounded justify-center bg-[#36404A]">
                      <p className="text-sm text-white">
                        {moment
                          .utc(msg.createdAt)
                          .format("LL")
                          .toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <div></div>
              )}
              <div
                className={`flex gap-2 mx-6 my-4 justify-${
                  msg.receiver.includes(receiver) ? "end" : "start"
                }`}
                style={
                  msg.receiver.includes(receiver)
                    ? { justifyContent: "flex-end" }
                    : { justifyContent: "flex-start" }
                }
              >
                <div className="flex gap-2">
                  {msg.receiver.includes(sender) &&
                  msg.sender !== chatMessages[i + 1]?.sender ? (
                    <Image
                      src="/images/profile-dummy.svg"
                      alt="profile"
                      height={30}
                      width={30}
                    />
                  ) : (
                    <div className="h-8 w-8"></div>
                  )}
                  <div
                    className={`p-3 max-w-sm rounded-t-lg ${
                      msg.receiver.includes(receiver)
                        ? "bg-[#36404A] rounded-br-lg"
                        : "bg-[#7083FF] rounded-bl-lg"
                    }`}
                  >
                    <p className="text-white text-base">{msg.text}</p>
                  </div>
                  {msg.receiver.includes(receiver) &&
                  msg.receiver[0] !== chatMessages[i + 1]?.receiver[0] ? (
                    <Image
                      src="/images/profile-dummy.svg"
                      alt="profile"
                      height={30}
                      width={30}
                    />
                  ) : (
                    <div className="h-8 w-8"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[10%] flex items-center px-6 w-full gap-8">
      <div className="relative">
      <FontAwesomeIcon
        icon={faFaceSmile}
        size="2x"
        color="#7083FF"
        onClick={handleIconClick}
      />
      {pickerVisible && (
        <Picker data={data} previewPosition="none" navPosition="bottom"  onEmojiSelect={handleEmojiSelect} />
      )}
      </div>  
        
        {/* <FontAwesomeIcon icon={faFaceSmile} size="2x" color="#7083FF" /> */}
        <form
          className="flex p-1.5 justify-between items-center bg-[#36404A] rounded-xl w-3/4"
          // onSubmit={(e) => sendMessage(e)}
        >
          <input
            type="text"
            className="px-2 py-1 w-full text-white focus:outline-none bg-transparent placeholder:text-[#A0A0A0]"
            placeholder="Type a Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="cursor-pointer"
            onClick={(e) => sendMessage(e)}
          >
            <Image src="/logos/send.svg" alt="send" height={50} width={50} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
