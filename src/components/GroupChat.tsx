import { RootState } from "@/redux/store";
import { searchUserApi } from "@/services/api.service";
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
}: {
  list: any;
  setList: any;
  listRef: any;
  setActiveChat: Function;
}) {
  const groupList = [
    {
      _id: "1242526",
      user: {
        user_name: "Group 1",
      },
      text: "hey from yash",
      createdAt: new Date(),
    },
    {
      _id: "1242522",
      user: {
        user_name: "Group 1",
      },
      text: "hey from yash",
      createdAt: new Date(),
    },
    {
      _id: "1242523",
      user: {
        user_name: "Group 2",
      },
      text: "hey from yash",
      createdAt: new Date(),
    },
    {
      _id: "1242524",
      user: {
        user_name: "Group 3",
      },
      text: "hey from yash",
      createdAt: new Date(),
    },
    {
      _id: "1242525",
      user: {
        user_name: "Group 4",
      },
      text: "hey from yash",
      createdAt: new Date(),
    },
  ];
  const [userSearch, setuserSearch] = useState("");
  const [activeScreen, setActiveScreen] = useState(ActiveScreen.GROUPCHAT);
  const user = useSelector((state: RootState) => state.user.user);

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
    //   getChatList();
  }, []);

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
                onKeyDown={getUser}
                type="text"
                value={userSearch}
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
                      <div className="flex flex-col ms-4">
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
              ) : (searchResult !== null &&
                  searchResult.length === 0 &&
                  userSearch !== null) ||
                searchResult?._id === user._id ? (
                <>
                  <p className="text-white text-center ">No result found</p>
                </>
              ) : (
                <div className="flex flex-col mt-2 gap-4 h-full md:h-[65vh] overflow-y-scroll">
                  {groupList.map((element: any) => {
                    return (
                      <div
                        className="bg-[#36404A] flex flex-row py-2 px-3 relative cursor-pointer "
                        key={element._id}
                      >
                        <div className="flex">
                          <CldImage
                            className="m-auto rounded-full h-[45px]"
                            src="mrokrrlw2ssnr3tf3vy2"
                            height={45}
                            width={45}
                            alt="dummy"
                          />

                          <div className="flex flex-col ms-4">
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
      {activeScreen === ActiveScreen.ADDUSER && (
        <AddUser
          list={list}
          setList={setList}
          listRef={listRef}
          setActiveChat={setActiveChat}
          setActiveScreen={setActiveScreen}
        />
      )}
      {activeScreen === ActiveScreen.GROUPPROFILE && (
        <NewGroupProfile setActiveScreen={setActiveScreen} />
      )}
    </>
  );
}
