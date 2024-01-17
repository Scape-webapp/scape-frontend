import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ChatListApi } from "@/services/api.service";
import { useEffect, useState } from "react";
import moment from "moment";
import _ from "lodash";

export default function LeftSideBar({ activeTab }: { activeTab: any }) {
  const [list, setList] = useState<any>([]);
  const user = useSelector((state: RootState) => state.user.user);
  enum activeBar {
    CHAT = "chat",
    GROUPCHAT = "groupChat",
    PROFILE = "profile",
    SETTING = "setting",
  }

  const getChatList = async () => {
    try {
      const list = await ChatListApi(user._id);
      let userList = list.data;

      // filtering duplicate combination ofsender/receiver messages
      userList = _.uniqWith(userList, function (arrVal: any, othVal: any) {
        return arrVal._id === othVal._id;
      });

      setList(userList);
    } catch (error) {
      // add fail toast later
      console.log("error in chat list api : ", error);
    }
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <div className="bg-[#303841] h-screen max-w-[380px] min-w-[380px]">
      {activeTab === activeBar.CHAT && (
        <>
          <p className="text-2xl text-white font-semibold pt-8 pl-8"> Chats </p>
          <div className="flex flex-col p-6 gap-4 w-full">
            <div className="bg-[#36404A] py-2 px-5 rounded-md flex items-center gap-2 w-full">
              <input
                type="text"
                placeholder="Search"
                className="text-white bg-transparent w-full focus:outline-none placeholder:text-white"
              />
              <FontAwesomeIcon icon={faSearch} color="white" />
            </div>

            <div className="flex flex-col mt-2 gap-4">
              {list.map((element: any) => {
                return (
                  <div
                    className="bg-[#36404A] flex flex-row py-2 px-3 "
                    key={element._id}
                  >
                    <div className="flex flex-row">
                      <Image
                        src="/images/profile-dummy.svg"
                        height={45}
                        width={45}
                        alt="dummy"
                      />
                      <div className="flex flex-col ms-4">
                        <p className="text-lg text-white">
                          {element.user.user_name}
                        </p>
                        <p className="text-[#455A64] text-sm">{element.text}</p>
                      </div>
                      <div>
                        <p className="text-[#455A64] text-sm mt-2 ">
                          {moment(element.createdAt).format("LT")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {activeTab === activeBar.PROFILE && <Profile />}
    </div>
  );
}
