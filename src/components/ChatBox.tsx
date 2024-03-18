"use client";
import {
  faEllipsisV,
  faFaceSmile,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  GroupChatListApi,
  chatApi,
  clearChatApi,
  clearGrpChatForUser,
} from "@/services/api.service";
import NonChatPage from "./NonChatPage";
import { CldImage } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";
import GroupInfo from "./GroupInfo";
import { toast } from "react-toastify";

const ChatBox = ({
  socket,
  activeChat,
  setActiveChat,
  activeChatRef,
  setList,
  listRef,
  groupInfoVisible,
  setgroupInfoVisible,
  userList,
  setUserList,
  getGroupChatList,
}: {
  socket: any;
  activeChat: any;
  setActiveChat: Function;
  activeChatRef: any;
  setgroupInfoVisible: Function;
  setList: any;
  groupInfoVisible: any;
  listRef: any;
  userList: any;
  setUserList: Function;
  getGroupChatList: Function;
}) => {
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);
  // const [groupInfoVisible, setgroupInfoVisible] = useState(false);

  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [imgPublicId, setImgPulicId] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const chatBox = useRef<any>(null);
  const user = useSelector((state: RootState) => state.user.user);

  const getMsgs = async () => {
    try {
      const msgs = await chatApi({
        receiver: activeChat.id,
        sender: user._id,
      });
      setChatMessages(msgs.data);
    } catch (error) {
      console.log("Error in get chat messages api : ", error);
    }
  };

  const getGroupMsgs = async () => {
    try {
      const msgs = await GroupChatListApi(activeChat.id);
      setChatMessages(msgs.data);
    } catch (error) {
      console.log("Error in get group messages api : ", error);
    }
  };

  const handleClearChat = async () => {
    await clearChatApi({
      receiver: activeChat.id,
      sender: user._id,
    });
    await getMsgs();
  };

  const clearGroupChat = async () => {
    try {
      await clearGrpChatForUser({
        groupId: activeChat.id,
      });
      await getGroupMsgs();
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong!");
    }
  };

  const sendMessage = async (e: any) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    let msgToSend = {
      receiver: activeChat.id,
      sender: user._id,
      text: message,
      image: imgPublicId,
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
    setImgPulicId("");
    setPickerVisible(false);
  };

  const sendGroupMessage = async (e: any) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    let msgToSend = {
      groupId: activeChat.id,
      sender: user._id,
      text: message,
      image: imgPublicId,
    };
    await socket.emit("send-grp-msg", msgToSend);
    setChatMessages((prevMessages: any) => [
      ...prevMessages,
      {
        ...msgToSend,
        createdAt: moment().toISOString(),
      },
    ]);
    setMessage("");
    setImgPulicId("");
    setPickerVisible(false);
  };

  useEffect(() => {
    if (chatBox && chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (activeChat.id && !activeChat.group_chat) getMsgs();
    if (activeChat.id && activeChat.group_chat) getGroupMsgs();
  }, [activeChat.id]);

  useEffect(() => {
    if (socket) {
      socket.on("msg-receive", (data: any) => {
        if (data.receiver !== undefined) {
          if (data?.sender === activeChatRef.current.id) {
            setChatMessages((prev: any) => [...prev, data]);
          } else {
            const list = listRef.current;
            const userIndex = (list || []).findIndex(
              (user: any) => user._id === data?.sender
            );
            list[userIndex] = {
              ...list[userIndex],
              text: data.text,
              isRead: false,
            };
            const chatList = [...list].sort((a, b) => {
              const isReadA: any = a.isRead === false;
              const isReadB: any = b.isRead === false;

              return isReadB - isReadA;
            });
            setList([...chatList]);
            listRef.current = [...chatList];
          }
        } else {
          if (data?.groupId === activeChatRef.current.id) {
            setChatMessages((prev: any) => [...prev, data]);
          } else {
            const list = listRef.current;
            const userIndex = (list || []).findIndex(
              (user: any) => user._id === data?.sender
            );

            list[userIndex] = {
              ...list[userIndex],
              text: data.text,
              isRead: false,
            };
            const chatList = [...list].sort((a, b) => {
              const isReadA: any = a.isRead === false;
              const isReadB: any = b.isRead === false;
              return isReadB - isReadA;
            });
            setList([...chatList]);
            listRef.current = [...chatList];
          }
        }
      });
    }
    return () => {
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
      }
    };
  }, [socket]);

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmojis((prevEmojis) => [...prevEmojis, emoji.native]);
    setMessage((prevMessage) => prevMessage + emoji.native);
  };

  const handleIconClick = () => {
    setPickerVisible(!pickerVisible);
  };

  return (
    <>
      {activeChat.id === "" ? (
        <NonChatPage />
      ) : (
        <div className="max-h-screen w-full bg-[#262E35] flex flex-col">
          <div className="h-[10%] border-b border-[#36404A] flex items-center py-2 px-8">
            <div
              className="flex justify-between items-center w-full cursor-pointer"
              onClick={() => {
                setgroupInfoVisible(!groupInfoVisible);
                setDropDownVisible(false);
              }}
            >
              <div className="flex items-center gap-4">
                <CldImage
                  className="m-auto rounded-full h-[45px]"
                  src={
                    activeChat.profile_image
                      ? activeChat.profile_image
                      : "mrokrrlw2ssnr3tf3vy2"
                  }
                  height={45}
                  width={45}
                  alt="profile"
                />
                <p className="text-xl font-medium text-white">
                  {activeChat.user_name}
                </p>
                <div className="bg-[#2CAC39] h-3 w-3 rounded-full" />
              </div>
            </div>
            <div className="dropdown relative cursor-pointer">
              <FontAwesomeIcon
                icon={faEllipsisV}
                size="xl"
                color="#787E83"
                onClick={() => {
                  setDropDownVisible(!dropDownVisible);
                }}
              />
              {dropDownVisible && (
                <ul className="dropdown-menu absolute right-0 text-gray-700 pt-1 w-32">
                  <li
                    className="rounded bg-gray-200 hover:bg-gray-400 hover:text-white py-2 px-4 block whitespace-no-wrap"
                    onClick={() => {
                      if (activeChat.id && !activeChat.group_chat) {
                        handleClearChat();
                      } else if (activeChat.id && activeChat.group_chat) {
                        clearGroupChat();
                      }
                      setDropDownVisible(false);
                    }}
                  >
                    Clear Chat
                  </li>
                </ul>
              )}
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
                    className={`flex gap-2 mx-6 break-words my-4 justify-${
                      msg.sender === user._id ? "end" : "start"
                    } `}
                    style={
                      msg.sender === user._id
                        ? { justifyContent: "flex-end" }
                        : { justifyContent: "flex-start" }
                    }
                  >
                    <div
                      className={`flex gap-2 ${
                        activeChat.group_chat && msg.sender !== user._id
                          ? "flex-row-reverse"
                          : ""
                      }`}
                    >
                      {msg.receiver === user._id &&
                      msg.sender !== chatMessages[i + 1]?.sender ? (
                        <CldImage
                          className="m-auto rounded-full h-[30px]"
                          src={
                            activeChat.profile_image
                              ? activeChat.profile_image
                              : "mrokrrlw2ssnr3tf3vy2"
                          }
                          height={30}
                          width={30}
                          alt="profile"
                        />
                      ) : (
                        <div className="h-8 w-8"></div>
                      )}
                      <div
                        className={`p-3 max-w-sm rounded-t-lg ${
                          msg.sender === user._id
                            ? "bg-[#36404A] rounded-bl-lg"
                            : "bg-[#7083FF] rounded-br-lg"
                        }`}
                      >
                        {msg.image ? (
                          <>
                            <CldImage
                              className="m-auto cursor-pointer object-cover  hover:scale-110 transition translate"
                              src={msg.image}
                              height={100}
                              width={200}
                              alt="dummy"
                            />
                          </>
                        ) : (
                          <p className="text-white text-base">{msg.text}</p>
                        )}
                        {/* <p className="text-white text-base">{msg.text}</p> */}
                      </div>
                      {(msg.sender === user._id &&
                        msg.sender[0] !== chatMessages[i + 1]?.sender[0]) ||
                      activeChat.group_chat ? (
                        <CldImage
                          className="m-auto rounded-full h-[30px]"
                          src={
                            msg.sender === user._id && !activeChat.group_chat
                              ? user.profile_image
                              : msg.user?.profile_image
                              ? msg.user.profile_image
                              : "mrokrrlw2ssnr3tf3vy2"
                          }
                          height={30}
                          width={30}
                          alt="profile"
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
            <CldUploadButton
              uploadPreset="Profile_picture"
              onSuccess={(result: any, { widget }) => {
                setImgPulicId(result?.info.public_id);
              }}
              onUpload={(e) => {
                if (!activeChat.group_chat) sendMessage(e);
                if (activeChat.group_chat) sendGroupMessage(e);
              }}
            >
              <FontAwesomeIcon size="2x" color="#7083FF" icon={faImage} />
            </CldUploadButton>
            <div className="relative">
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faFaceSmile}
                size="2x"
                color="#7083FF"
                onClick={handleIconClick}
              />
              {pickerVisible && (
                <div className="absolute bottom-10 ">
                  <Picker
                    data={data}
                    perLine={7}
                    maxFrequentRows={1}
                    previewPosition="none"
                    navPosition="bottom"
                    onEmojiSelect={handleEmojiSelect}
                  />
                </div>
              )}
            </div>

            {/* <FontAwesomeIcon icon={faFaceSmile} size="2x" color="#7083FF" /> */}
            <form
              className="flex p-1.5 justify-between items-center bg-[#36404A] rounded-xl w-full"
              // onSubmit={(e) => sendMessage(e)}
            >
              <input
                type="text"
                className="px-2 py-1 w-full text-white focus:outline-none bg-transparent placeholder:text-[#A0A0A0]"
                placeholder="Type a Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value.trim())}
              />
              <button
                type="submit"
                className="cursor-pointer"
                onClick={(e) => {
                  if (!activeChat.group_chat && message.trim() !== "")
                    sendMessage(e);
                  else activeChat.group_chat && message.trim() !== "";
                  sendGroupMessage(e);
                }}
              >
                <Image
                  src="/logos/send.svg"
                  alt="send"
                  height={50}
                  width={50}
                />
              </button>
            </form>
          </div>
        </div>
      )}
      {groupInfoVisible && (
        <GroupInfo
          socket={socket}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          activeGrpChat={activeChat.id}
          groupInfoVisible={groupInfoVisible}
          setgroupInfoVisible={setgroupInfoVisible}
          userList={userList}
        />
      )}
    </>
  );
};

export default ChatBox;
