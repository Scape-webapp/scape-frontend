"use client";
import {
  faArrowLeftLong,
  faCheck,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React from "react";
import { NewGroupApi } from "@/services/api.service";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

enum ActiveScreen {
  GROUPCHAT = "groupChat",
  ADDUSER = "addUser",
  GROUPPROFILE = "groupProfile",
}

export default function NewGroupProfile({
  setActiveScreen,
  newGrpUserList,
  socket,
  getGroupChatList,
}: {
  setActiveScreen: Function;
  newGrpUserList: any;
  socket: any;
  getGroupChatList: Function;
}) {
  const [imgPublicId, setImgPulicId] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.user.user);
  const [groupDetails, setgroupDetails] = useState({
    name: "",
    description: "",
    profile_image: "",
  });

  const [pickerVisible, setPickerVisible] = useState(false);
  const handleChange = (event: any) => {
    setgroupDetails({
      ...groupDetails,
      [event.target.name]: event.target.value,
    });
  };
  const handleIconClick = () => {
    setPickerVisible(!pickerVisible);
  };
  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmojis((prevEmojis) => [...prevEmojis, emoji.native]);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const handleCreateGroup = async () => {
    try {
      const body = {
        name: groupDetails.name,
        profile_image: groupDetails.profile_image,
        description: groupDetails.description,
        users: [...newGrpUserList, user._id],
        admins: [user._id],
      };

      await socket.emit("group-created", body);
      getGroupChatList();
      setActiveScreen(ActiveScreen.GROUPCHAT);
    } catch (error) {
      // add fail toast later
      console.log("error in create new group socket emit : ", error);
    }
  };

  return (
    <div>
      <p className="text-2xl text-white font-semibold pt-8 px-8 flex gap-4 items-center">
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={faArrowLeftLong}
          size="lg"
          onClick={() => {
            setActiveScreen(ActiveScreen.ADDUSER);
          }}
        />
        New Group
      </p>
      <form onSubmit={handleSubmit}>
        <div className="px-8 pt-10">
          <CldUploadWidget
            uploadPreset="Profile_picture"
            onSuccess={(result: any, { widget }) => {
              setImgPulicId(result?.info.public_id);
            }}
          >
            {({ open }) => {
              return (
                <CldImage
                  onClick={() => open()}
                  className="m-auto cursor-pointer rounded-full h-[150px]"
                  src={imgPublicId ? imgPublicId : "mrokrrlw2ssnr3tf3vy2"}
                  height={150}
                  width={150}
                  alt="profile"
                />
              );
            }}
          </CldUploadWidget>
          <div className="mt-10 pb-5 border-b border-[#36404A] ">
            <div className="flex gap-4  items-center">
              <div className="bg-[#40474e] py-2 px-5  rounded-[8px] flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={groupDetails.name || ""}
                  onChange={(e) => handleChange(e)}
                  placeholder="Group name"
                  name="name"
                  className="text-[#787e83] bg-transparent w-full focus:outline-none placeholder:text-[#909DAB]"
                />
              </div>
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faFaceSmile}
                size="xl"
                color="#7083FF"
                onClick={handleIconClick}
              />
              {pickerVisible && (
                <div className="absolute bottom-0">
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
          </div>
          <p className="text-white text-xl mt-2  py-2">Description</p>
          <div className="bg-[#36404A] py-2 px-5  rounded-[8px] flex items-center gap-2 w-full">
            <textarea
              value={groupDetails.description || ""}
              onChange={(e) => handleChange(e)}
              name="description"
              placeholder="Type here"
              className="text-white bg-transparent w-full focus:outline-none placeholder:text-[#909DAB]"
            />
          </div>
          <div className="m-auto my-10 text-center">
            <button className="bg-[#7083FF]  rounded-[20px] px-10 py-2 font-bold cursor-pointer shadow-md hover:bg-[#343A40] hover:text-white">
              <FontAwesomeIcon
                size="lg"
                style={{ color: "#ffffff" }}
                icon={faCheck}
                className="cursor-pointer"
                onClick={() => handleCreateGroup()}
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
