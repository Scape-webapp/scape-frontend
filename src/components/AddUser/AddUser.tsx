import {
  faArrowLeft,
  faArrowRight,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ChatListApi, searchUserApi } from "@/services/api.service";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import uniqWith from "lodash/uniqWith";
import { CldImage } from "next-cloudinary";
import "./AddUser.css";
import { debounce } from "lodash";
import Loader from "../Common/Loader/Loader";

enum ActiveScreen {
  GROUPCHAT = "groupChat",
  ADDUSER = "addUser",
  GROUPPROFILE = "groupProfile",
}

export default function AddUser({
  list,
  setList,
  listRef,
  setActiveChat,
  setActiveScreen,
  setNewGrpUserList,
}: {
  list: any;
  setList: any;
  listRef: any;
  setActiveChat: Function;
  setActiveScreen: Function;
  setNewGrpUserList: Function;
}) {
  const [userSearch, setuserSearch] = useState("");
  const user = useSelector((state: RootState) => state.user.user);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [userArray, setUserArray] = useState<any>([]);
  const [userLoading, setuserLoading] = useState(false);

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

  const handleAddUser = () => {
    if (userArray.length > 0) {
      const users = userArray.map((element: any) => {
        return element._id;
      });
      setNewGrpUserList(users);
      setActiveScreen(ActiveScreen.GROUPPROFILE);
    } else {
      // set validation error
    }
  };

  useEffect(() => {
    getChatList();

    return () => {
      debouncedResults.cancel();
    };
  }, []);

  useEffect(() => {
    getUser();
  }, [userSearch]);

  return (
    <div className="bg-[#303841] h-screen max-w-[380px] min-w-[380px]">
      <>
        <p className="text-2xl text-white font-semibold pt-8 pl-8">
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="lg"
            style={{ color: "#ffffff" }}
            className="cursor-pointer mr-4"
            onClick={() => {
              setActiveScreen(ActiveScreen.GROUPCHAT);
            }}
          />
          Add User’s
        </p>

        <div className="flex flex-col px-6 pt-4 w-full ">
          <div className="bg-[#36404A] py-2 px-5 rounded-md flex items-center gap-2 w-full h-20 overflow-scroll no-scrollbar">
            {userArray.map((element: any) => {
              if (element)
                return (
                  <div className="flex justify-between text-white border-[3px] border-[#455A64] rounded-lg px-4 py-1  min-w-fit">
                    <CldImage
                      className="mr-2 rounded-full h-[30px]"
                      src={
                        element.profile_image
                          ? element.profile_image
                          : "mrokrrlw2ssnr3tf3vy2"
                      }
                      height={30}
                      width={30}
                      alt="profile"
                    />
                    <span className="my-1">{element.user_name}</span>
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{ color: "#787E83" }}
                      className="cursor-pointer ml-2 my-2"
                      onClick={() => {
                        const userList = userArray.filter(
                          (ele: any) => element._id !== ele._id
                        );
                        setUserArray(userList);
                      }}
                    />
                  </div>
                );
            })}
            {userArray.length === 0 ? (
              <span className="text-[#668290] ">Select user's to add</span>
            ) : (
              ""
            )}
          </div>
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
            {searchResult?.length > 0 && userSearch ? (
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
                              const userList = [
                                ...userArray,
                                {
                                  _id: searchedUser._id,
                                  user_name: searchedUser.user_name,
                                  profile_image: searchedUser.profile_image,
                                },
                              ]; // new array need to update
                              setUserArray(userList);
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
              <div className="flex flex-col mt-2 gap-4 h-full md:h-[56vh] overflow-y-scroll">
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
                            const userList = [
                              ...userArray,
                              {
                                _id: element._id,
                                user_name: element.user.user_name,
                                profile_image: element.user.profile_image,
                              },
                            ]; // new array need to update
                            setUserArray(userList);
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
        <div className="m-auto text-center">
          <button
            className="bg-[#7083FF]  rounded-[10px] px-14 py-2 font-bold cursor-pointer shadow-md hover:bg-[#5462ba] hover:text-white"
            onClick={() => {
              handleAddUser();
            }}
          >
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faArrowRight}
              color="white"
            />
          </button>
        </div>
      </>
    </div>
  );
}
