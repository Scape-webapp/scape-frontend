import { faEllipsisV, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function ChatBox() {
  const dummyMessages = [
    {
      msg: "hello",
      recieved: "me",
      sent: "other",
    },
    { msg: "hello hi", recieved: "me", sent: "other", lastMsg: true },
    {
      msg: "i am fine, hi, am fine, hi, am fine, hi lorem wywybx syx sy yazyaay twvsv",
      recieved: "other",
      sent: "me",
    },
    { msg: "how doin", recieved: "other", sent: "me", lastMsg: true },
    { msg: "fantastic", recieved: "me", sent: "other" },
    { msg: "hello hi", recieved: "me", sent: "other", lastMsg: true },
    { msg: "i am fine, hi", recieved: "other", sent: "me" },
    { msg: "how doin", recieved: "other", sent: "me", lastMsg: true },
    { msg: "fantastic", recieved: "me", sent: "other", lastMsg: true },
  ];

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
        <div className="h-full w-full overflow-y-scroll overflow-x-hidden">
          {/* Date */}
          <div className="flex items-center mb-3 justify-center">
            <div className="py-1 px-3 flex rounded justify-center bg-[#36404A]">
              <p className="text-xs text-white">Today</p>
            </div>
          </div>
          {/* Messages */}
          {dummyMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 mx-6 my-4 justify-${
                msg.recieved === "other" ? "start" : "end"
              }`}
              style={
                msg.recieved === "other"
                  ? { justifyContent: "flex-start" }
                  : { justifyContent: "flex-end" }
              }
            >
              <div className="flex gap-2">
                {msg.lastMsg && msg.recieved === "other" ? (
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
                    msg.recieved === "other"
                      ? "bg-[#36404A] rounded-br-lg"
                      : "bg-[#7083FF] rounded-bl-lg"
                  }`}
                >
                  <p className="text-white text-base">{msg.msg}</p>
                </div>
                {msg.lastMsg && msg.sent === "other" ? (
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
          ))}
        </div>
      </div>

      <div className="h-[10%] flex items-center px-6 w-full gap-8">
        <FontAwesomeIcon icon={faFaceSmile} size="2x" color="#7083FF" />
        <div className="flex p-1.5 justify-between items-center bg-[#36404A] rounded-xl w-3/4">
          <input
            type="text"
            className="px-2 py-1 w-full text-white focus:outline-none bg-transparent placeholder:text-[#A0A0A0]"
            placeholder="Type a Message"
          />
          <Image src="/logos/send.svg" alt="send" height={50} width={50} />
        </div>
      </div>
    </div>
  );
}
