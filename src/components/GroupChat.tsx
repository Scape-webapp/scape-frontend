import { RootState } from "@/redux/store";
import { GroupListApi, searchGroupApi } from "@/services/api.service";
import {
  faArrowLeft,
  faSearch,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import NewGroupProfile from "./NewGroupProfile";
import uniqWith from "lodash/uniqWith";
import AddUser from "./AddUser/AddUser";

enum ActiveScreen {
  GROUPCHAT = "groupChat",
  ADDUSER = "addUser",
  GROUPPROFILE = "groupProfile",
}

export default function GroupChat({
  list,
  setList,
  listRef,
  setActiveChat,
  socket,
  activeChatRef,
  setgroupInfoVisible,
  getGroupChatList,
  userList,
  setUserList,
}: {
  list: any;
  setList: any;
  listRef: any;
  socket: any;
  setActiveChat: Function;
  activeChatRef: any;
  setgroupInfoVisible: Function;
  getGroupChatList: Function;
  userList: any;
  setUserList: Function;
}) {
  const [userSearch, setuserSearch] = useState("");
  const [newGrpUserList, setNewGrpUserList] = useState([]);
  const [activeScreen, setActiveScreen] = useState(ActiveScreen.GROUPCHAT);
  const user = useSelector((state: RootState) => state.user.user);

  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const getGrp = async () => {
    const searchList: any[] = (userList || []).filter((ele: any) =>
      ele?.name?.match(new RegExp(userSearch, "gi"))
    );
    setSearchResult(searchList);
  };

  const handleChange = (e: any) => {
    const searchQuery = e.target.value;
    setuserSearch(searchQuery);
    setIsSearching(searchQuery.trim() !== "");
  };

  useEffect(() => {
    getGroupChatList();
  }, []);

  useEffect(() => {
    if (userSearch) getGrp();
  }, [userSearch]);

  useEffect(() => {
    if (socket) {
      socket.on("added-to-group", (data: any) => {
        getGroupChatList();
      });
    }
  }, [socket]);

  return (
    <>
      {activeScreen === ActiveScreen.GROUPCHAT && (
        <>
          <div className="flex items-center justify-between pt-8 px-8">
            <p className="text-2xl text-white font-semibold"> Group Chat </p>
            <FontAwesomeIcon
              icon={faUserGroup}
              color={"#7083FF"}
              id="grp-icon"
              className="cursor-pointer text-2xl"
              onClick={() => {
                setActiveScreen(ActiveScreen.ADDUSER);
              }}
            />
            <Tooltip anchorSelect="#grp-icon" place="right">
              Add New Group
            </Tooltip>
          </div>
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
                  }}
                />
              )}
              <input
                onChange={handleChange}
                type="text"
                value={userSearch}
                placeholder="Search"
                className="text-white bg-transparent w-full focus:outline-none placeholder:text-white"
              />
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faSearch}
                color="white"
                onClick={getGrp}
              />
            </div>
            <div className="flex flex-col gap-2">
              {searchResult?.length > 0 && userSearch ? (
                searchResult.map((searchedGrp: any) => (
                  <div
                    className="bg-[#36404A] flex flex-row py-2 px-3 cursor-pointer justify-between"
                    key={searchedGrp?._id}
                    onClick={() => {
                      const chat = {
                        id: searchedGrp._id,
                        user_name: searchedGrp.name,
                        profile_image: searchedGrp.profile_image,
                        group_chat: true,
                      };
                      searchedGrp?.isRead === false
                        ? (searchedGrp.isRead = true)
                        : null;
                      setList([...list]);
                      listRef.current = [...list];
                      setActiveChat(chat);
                      setgroupInfoVisible(false);
                      activeChatRef.current = chat;
                    }}
                  >
                    <div className="flex w-full justify-between">
                      <div className="flex justify-between">
                        <CldImage
                          className="m-auto rounded-full h-[50px]"
                          src={
                            searchedGrp.profile_image
                              ? searchedGrp.profile_image
                              : "mrokrrlw2ssnr3tf3vy2"
                          }
                          height={50}
                          width={50}
                          alt="profile"
                        />
                        <div className="flex flex-col ms-4">
                          <p className="text-lg text-white">
                            {searchedGrp?.name}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[#455A64] text-sm mt-2 ">
                          {moment(searchedGrp.createdAt).format("L")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : searchResult !== null &&
                searchResult.length === 0 &&
                userSearch !== null ? (
                <>
                  <p className="text-white text-center ">No result found</p>
                </>
              ) : (
                <div className="flex flex-col mt-2 gap-4 h-full md:h-[65vh] overflow-y-scroll">
                  {userList.map((element: any) => {
                    return (
                      <div
                        className="bg-[#36404A] flex flex-row py-2 px-3 relative cursor-pointer "
                        key={element._id}
                        onClick={() => {
                          const chat = {
                            id: element._id,
                            user_name: element.name,
                            profile_image: element.profile_image,
                            group_chat: true,
                          };
                          element?.isRead === false
                            ? (element.isRead = true)
                            : null;
                          setList([...list]);
                          listRef.current = [...list];
                          setActiveChat(chat);
                          setgroupInfoVisible(false);
                          activeChatRef.current = chat;
                        }}
                      >
                        <div className="flex">
                          <CldImage
                            className="m-auto rounded-full h-[45px]"
                            src={
                              element.profile_image
                                ? element.profile_image
                                : "mrokrrlw2ssnr3tf3vy2"
                            }
                            height={45}
                            width={45}
                            alt="profile"
                          />

                          <div className="flex flex-col ms-4">
                            <p className="text-lg text-white">{element.name}</p>

                            <p className="text-[#455A64] w-[150px] text-sm truncate ...">
                              {element.senderName[element.senderName.length - 1]
                                ?._id === user._id
                                ? "You "
                                : element.senderName[
                                    element.senderName.length - 1
                                  ]?.user_name}
                              :{" "}
                              {
                                element.message[element.message.length - 1]
                                  ?.text
                              }
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
      {activeScreen === ActiveScreen.ADDUSER && (
        <AddUser
          list={list}
          setList={setList}
          listRef={listRef}
          setActiveChat={setActiveChat}
          setActiveScreen={setActiveScreen}
          setNewGrpUserList={setNewGrpUserList}
        />
      )}
      {activeScreen === ActiveScreen.GROUPPROFILE && (
        <NewGroupProfile
          setActiveScreen={setActiveScreen}
          newGrpUserList={newGrpUserList}
          socket={socket}
          getGroupChatList={getGroupChatList}
        />
      )}
    </>
  );
}
