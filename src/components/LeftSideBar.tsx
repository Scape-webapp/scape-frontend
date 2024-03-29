import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ChatListApi, searchUserApi } from "@/services/api.service";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import uniqWith from "lodash/uniqWith";
import { CldImage } from "next-cloudinary";
import GroupChat from "./GroupChat";
import { debounce } from "lodash";
import Loader from "./Common/Loader/Loader";

export default function LeftSideBar({
  list,
  setList,
  listRef,
  activeChatRef,
  setActiveChat,
  socket,
  setgroupInfoVisible,
  userList,
  setUserList,
  getGroupChatList,
}: {
  list: any;
  setList: any;
  listRef: any;
  activeChatRef: any;
  setActiveChat: Function;
  socket: any;
  setgroupInfoVisible: any;
  userList: any;
  setUserList: Function;
  getGroupChatList: Function;
}) {
  const [userSearch, setuserSearch] = useState("");
  const user = useSelector((state: RootState) => state.user.user);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [userLoading, setuserLoading] = useState(false);

  enum activeBar {
    CHAT = "chat",
    GROUPCHAT = "groupChat",
    PROFILE = "profile",
    SETTING = "setting",
  }

  const activeTab = useSelector((state: RootState) => state.activeTab.tabValue);

  const getChatList = async () => {
    try {
      setuserLoading(true);
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
    } finally {
      setuserLoading(false);
    }
  };

  const getUser = async () => {
    try {
      if (!userSearch) {
        setIsSearching(false);
        setSearchResult(null);
        return;
      }
      setuserLoading(true);
      const searchUser: any = await searchUserApi(userSearch);
      setSearchResult(searchUser.data);
    } catch (e) {
    } finally {
      setuserLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const searchQuery = e.target.value;
    setuserSearch(searchQuery);
    setIsSearching(searchQuery.trim() !== "");
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  useEffect(() => {
    getUser();
  }, [userSearch]);

  useEffect(() => {
    getChatList();

    return () => {
      debouncedResults.cancel();
    };
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
                    setuserSearch("");
                    setIsSearching(false);
                    setSearchResult(null);
                    getChatList();
                  }}
                />
              )}
              <input
                onChange={debouncedResults}
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
            <div className="flex flex-col gap-2">
              {searchResult?.length > 0 ? (
                searchResult.map(
                  (searchedUser: any) =>
                    user._id !== searchedUser?._id && (
                      <div
                        className="bg-[#36404A] flex flex-row py-2 px-3 cursor-pointer justify-between"
                        key={searchedUser?._id}
                      >
                        <div className="flex w-full justify-between">
                          <div className="flex justify-between">
                            <CldImage
                              className="rounded-full h-[45px]"
                              src={
                                searchedUser.profile_image
                                  ? searchedUser.profile_image
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
                                  id: searchedUser?._id,
                                  user_name: searchedUser?.user_name,
                                  profile_image: searchedUser?.profile_image,
                                  group_chat: false,
                                });
                              }}
                            >
                              <p className="text-lg text-white">
                                {searchedUser?.user_name}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[#455A64] text-sm mt-1">
                              {moment(searchedUser.createdAt).format("L")}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                )
              ) : userLoading ? (
                <div className="flex items-center justify-center w-full my-1.5">
                  <Loader />
                </div>
              ) : searchResult !== null &&
                searchResult.length === 0 &&
                userSearch !== null &&
                !userLoading ? (
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
                            className="m-auto rounded-full h-[50px]"
                            src={
                              element.user.profile_image
                                ? element.user.profile_image
                                : "mrokrrlw2ssnr3tf3vy2"
                            }
                            height={50}
                            width={50}
                            alt="dummy"
                          />

                          <div
                            className="flex flex-col ms-4"
                            onClick={() => {
                              const chat = {
                                id: element.user._id,
                                user_name: element.user.user_name,
                                profile_image: element.user.profile_image,
                                group_chat: false,
                              };
                              element?.isRead === false
                                ? (element.isRead = true)
                                : null;
                              setList([...list]);
                              setgroupInfoVisible(false);
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
                            <div className="h-4 w-4 bg-[#7083FF] rounded-full flex justify-center items-center absolute top-10 right-6" />
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
      {activeTab === activeBar.GROUPCHAT && (
        <GroupChat
          list={list}
          setList={setList}
          listRef={listRef}
          setActiveChat={setActiveChat}
          socket={socket}
          activeChatRef={activeChatRef}
          setgroupInfoVisible={setgroupInfoVisible}
          getGroupChatList={getGroupChatList}
          userList={userList}
          setUserList={setUserList}
        />
      )}
    </div>
  );
}
