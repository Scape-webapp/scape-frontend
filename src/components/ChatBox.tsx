import { faEllipsisV, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
// var ObjectID = require("bson-objectid");
import axios from "axios";
import moment from "moment-timezone";

export default function ChatBox() {
  const dummyMessages = [
    {
      msg: "hello",
      receiver: "me",
      sent: "6574b5dcb558663da9b3e808",
    },
    {
      msg: "hello hi",
      receiver: "me",
      sent: "6574b5dcb558663da9b3e808",
      lastMsg: true,
    },
    {
      msg: "i am fine, hi, am fine, hi, am fine, hi lorem wywybx syx sy yazyaay twvsv",
      receiver: "6574b5dcb558663da9b3e808",
      sent: "me",
    },
    {
      msg: "how doin",
      receiver: "6574b5dcb558663da9b3e808",
      sent: "me",
      lastMsg: true,
    },
    { msg: "fantastic", receiver: "me", sent: "6574b5dcb558663da9b3e808" },
    {
      msg: "hello hi",
      receiver: "me",
      sent: "6574b5dcb558663da9b3e808",
      lastMsg: true,
    },
    { msg: "i am fine, hi", receiver: "6574b5dcb558663da9b3e808", sent: "me" },
    {
      msg: "how doin",
      receiver: "6574b5dcb558663da9b3e808",
      sent: "me",
      lastMsg: true,
    },
    {
      msg: "fantastic",
      receiver: "me",
      sent: "6574b5dcb558663da9b3e808",
      lastMsg: true,
    },
  ];

  let sender = "6574bd61378887aeab034740";
  let reciever = "6574b5dcb558663da9b3e808";
  const [message, setmessage] = useState<any>([]);

  const getMSgs = async () => {
    const msgs = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/message/history`,
      {
        receiver: [reciever],
        sender: sender,
      }
    );
    setmessage(msgs.data);
    // debugger;
    let rawMsgs = [...msgs.data];
    // const updateMsgsBody = [];
    // rawMsgs.unshift({
    //   date: new Date(rawMsgs[0].createdAt).toLocaleDateString(),
    // });

    // for (let i = 1; i < msgs.data.length; i++) {
    //   // debugger;
    //   const msgDate: string = new Date(
    //     msgs.data[i].createdAt
    //   ).toLocaleDateString();
    //   const prevDate = new Date(
    //     msgs.data[i - 1].createdAt
    //   ).toLocaleDateString();
    //   const todayDate: string = new Date().toLocaleDateString();
    //   console.log('todayDate :>> ', todayDate);
    //   if (msgDate !== prevDate) {
    //     rawMsgs.splice(i, 0, { date: msgDate });
    //   } else if (msgDate === todayDate) {
    //     debugger
    //     rawMsgs.splice(i, 0, { date: "Today" });
    //   }
    // }
    // rawMsgs = [...rawMsgs];
    console.log(
      "moment.utc().toLocaleString() :>> ",
      moment().toLocaleString()
    );
    console.log(rawMsgs);
  };

  useEffect(() => {
    const res = getMSgs();
  }, []);

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
          {/* Messages */}
          {message.map((msg: any, i: any) => (
            <div key={i}>
              {moment.utc(msg.createdAt).format("LL") ===
                moment().format("LL") &&
              moment.utc(msg.createdAt).format("LL") !==
                moment.utc(message[i - 1]?.createdAt).format("LL") ? (
                <div className="flex items-center mb-3 justify-center">
                  <div className="py-1 px-3 flex rounded justify-center bg-[#36404A]">
                    <p className="text-sm text-white">Today</p>
                  </div>
                </div>
              ) : moment.utc(msg.createdAt).format("LL") !==
                  moment.utc(message[i - 1]?.createdAt).format("LL") &&
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
                  msg.receiver.includes(reciever) ? "end" : "start"
                }`}
                style={
                  msg.receiver.includes(reciever)
                    ? { justifyContent: "flex-end" }
                    : { justifyContent: "flex-start" }
                }
              >
                <div className="flex gap-2">
                  {msg.receiver.includes(sender) &&
                  msg.sender !== message[i + 1]?.sender ? (
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
                      msg.receiver.includes(reciever)
                        ? "bg-[#36404A] rounded-br-lg"
                        : "bg-[#7083FF] rounded-bl-lg"
                    }`}
                  >
                    <p className="text-white text-base">{msg.text}</p>
                  </div>
                  {msg.receiver.includes(reciever) &&
                  msg.receiver[0] !== message[i + 1]?.receiver[0] ? (
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
