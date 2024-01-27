import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ChatListApi, searchUserApi } from "@/services/api.service";
import { useEffect, useState } from "react";
import moment from "moment";
import uniqWith from "lodash/uniqWith";
import { CldImage } from 'next-cloudinary';

export default function LeftSideBar({
  list,
  setList,
  listRef,
  activeChatRef,
  activeTab,
  activeChat,
  setActiveChat,
}: {
  list: any;
  setList: any;
  listRef: any;
  activeChatRef: any;
  activeTab: any;
  activeChat: object;
  setActiveChat: Function;
}) {
  const [userSearch, setuserSearch] = useState("");
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
      userList = uniqWith(userList, function (arrVal: any, othVal: any) {
        return arrVal._id === othVal._id;
      });

      setList(userList);
      listRef.current = userList;
    } catch (error) {
      // add fail toast later
      console.log("error in chat list api : ", error);
    }
  };
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const getUser = async () => {
    try {
      const searchUser: any = await searchUserApi(userSearch);
      setSearchResult(searchUser.data);
    } catch (e) {}
  };

  const handleChange = (e: any) => {
    const searchQuery = e.target.value;
    setuserSearch(searchQuery);
    setIsSearching(searchQuery.trim() !== "");
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
              {isSearching && (
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  color="white"
                  className="cursor-pointer"
                  onClick={() => {
                    setuserSearch(" ");
                    setIsSearching(false);
                    setSearchResult(null);
                    getChatList();
                  }}
                />
              )}
              <input
                onChange={handleChange}
                onKeyUp={getUser}
                type="text"
                placeholder="Search"
                className="text-white bg-transparent w-full focus:outline-none placeholder:text-white"
              />
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faSearch}
                color="white"
                onClick={getUser}
              />
            </div>
            <div className=" ">
              {searchResult?._id !== user._id && searchResult ? (
                <>
                  <div
                    className="bg-[#36404A] flex flex-row py-2 px-3 cursor-pointer "
                    key={searchResult?._id}
                  >
                    <div className="flex">
                      <CldImage
                        className="m-auto rounded-full h-[45px]"
                        src={
                          searchResult.profile_image
                            ? searchResult.profile_image
                            : "mrokrrlw2ssnr3tf3vy2"
                        }
                        height={45}
                        width={45}
                        alt="dummy"
                      />
                      <div
                        className="flex flex-col ms-4"
                        onClick={() => {
                          setActiveChat({
                            id: searchResult?._id,
                            user_name: searchResult?.user_name,
                          });
                        }}
                      >
                        <p className="text-lg text-white">
                          {searchResult?.user_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#455A64] text-sm mt-2 ">
                          {moment(searchResult.createdAt).format("L")}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : searchResult?._id === user._id ? (
                <>
                  <p className="text-white text-center ">No result found</p>
                </>
              ) : (
                <div className="flex flex-col mt-2 gap-4 h-full md:h-[65vh] overflow-y-scroll">
                  {list.map((element: any) => {
                    return (
                      <div
                        className="bg-[#36404A] flex flex-row py-2 px-3 relative cursor-pointer "
                        key={element._id}
                      >
                        <div className="flex">
                          <CldImage
                            className="m-auto rounded-full h-[45px]"
                            src={
                              element.user.profile_image
                                ? element.user.profile_image
                                : "mrokrrlw2ssnr3tf3vy2"
                            }     
                             height={45}                       
                            width={45}
                            alt="dummy"
                          />

                          <div
                            className="flex flex-col ms-4"
                            onClick={() => {
                              const chat = {
                                id: element.user._id,
                                user_name: element.user.user_name,
                                profile_image:element.user.profile_image,
                              };
                              element?.isRead === false
                                ? (element.isRead = true)
                                : null;
                              setList([...list]);
                              listRef.current = [...list];
                              setActiveChat(chat);
                              activeChatRef.current = chat;
                            }}
                          >
                            <p className="text-lg text-white">
                              {element.user.user_name}
                            </p>

                            <p className="text-[#455A64] w-[150px] text-sm truncate ...">
                              {element.text}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#455A64] text-sm mt-2 ">
                              {moment(element.createdAt).format("L")}
                            </p>
                          </div>
                          {element?.isRead === false && (
                            <div className="h-4 w-4 bg-[#7083FF] rounded-full flex justify-center items-center absolute top-6 right-4" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {activeTab === activeBar.PROFILE && <Profile />}
    </div>
  );
}
