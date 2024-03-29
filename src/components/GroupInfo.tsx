import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { CldImage } from "next-cloudinary";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { GroupInfoApi } from "@/services/api.service";
import { getProfileDetails } from "@/services/api.service";
import { toast } from "react-toastify";


const GroupInfo = ({
  activeGrpChat,
  activeChat,
  setActiveChat,
  socket,
  groupInfoVisible,
  setgroupInfoVisible,
  userList,
}: {
  activeGrpChat: any;
  socket: any;
  activeChat: any;
  setActiveChat: Function;
  groupInfoVisible: any;
  setgroupInfoVisible: Function;
  userList: any;
}) => {
  const [imgPublicId, setImgPulicId] = useState("");
  const [grpdetails, setGrpdetails] = useState<any>([]);
  const [grpMembers, setGrpMembers] = useState([]);
  const [isNewImageUploaded, setIsNewImageUploaded] = useState(false); 


  const getGroupInfoList = async () => {
    try {
      const info = await GroupInfoApi(activeGrpChat);
      let grpInfo: any = info.data;
      setGrpdetails(grpInfo[0]);
      setGrpMembers(grpInfo[0].grpmember);
    } catch (error) {
      // add fail toast later
      console.log("error in chat list api : ", error);
    }
  };

  const getUpdateInfoList = async () => {
    try {
      const update = {
        profile_image: imgPublicId,
      };
      socket.emit("update-grpprofile", {
        groupId: activeGrpChat,
        update: update,
      });
      setActiveChat({
        id: activeGrpChat,
        user_name: activeChat?.user_name,
        profile_image: imgPublicId,
        group_chat: true,
      });
      // update image on own groulist component
      userList.forEach((element: any) => {
        if (element._id === activeGrpChat) {
          element.profile_image = imgPublicId;
        }
      });
      toast.success("Profile Image updated successfully!");
      setIsNewImageUploaded(false);
    } catch (error:any) {
      toast.error("Something went wrong!");
      console.log("error in chat list api : ", error);
    }
  };

  const profileData = async () => {
    try {
      const response = await getProfileDetails(activeGrpChat);
      setGrpdetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("added-grpprofile", (data: any) => {
        if (data._id === activeChat.id) {
          setImgPulicId(data.profile_image);
          setActiveChat({
            id: data?._id,
            user_name: data?.name,
            profile_image: data?.profile_image,
            group_chat: true,
          });
        }
        // update image on reciever grouplist component
        userList.forEach((element: any) => {
          if (element._id === data._id) {
            element.profile_image = data.profile_image;
          }
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    activeChat.group_chat ? getGroupInfoList() : profileData();
  }, []);

  return (
    <div className="bg-[#303841] h-screen max-w-[380px] min-w-[380px] overflow-scroll">
      <div className="flex items-center justify-between pt-8 px-8">
        <p className="text-2xl text-white font-semibold flex gap-4 items-center">
          <FontAwesomeIcon
            icon={faXmark}
            className="cursor-pointer"
            size="lg"
            onClick={() => {
              setgroupInfoVisible(!groupInfoVisible);
            }}
          />
          {activeChat.group_chat ? (
            <div className="flex">
              <p className="py-1">Group Info</p>
              {activeChat.group_chat && isNewImageUploaded && (
                <button
                  onClick={getUpdateInfoList}
                  className="bg-[#7083FF] rounded-[10px] px-4  cursor-pointer shadow-md hover:bg-[#5462ba] text-white ms-10 text-lg"
                >
                  Update
                </button>
              )}
            </div>
          ) : (
            "Friend Info"
          )}
        </p>
      </div>
      <div className="pt-8">
        {activeChat.group_chat ? (
          <CldUploadWidget
            uploadPreset="Profile_picture"
            onSuccess={(result: any, { widget }) => {
              setImgPulicId(result?.info.public_id);
              setIsNewImageUploaded(true);
            }}
          >
            {({ open }) => {
              return (
                <CldImage
                  onClick={() => open()}
                  className="m-auto cursor-pointer rounded-full h-[150px]"
                  src={
                    imgPublicId
                      ? imgPublicId
                      : grpdetails?.profile_image
                      ? grpdetails?.profile_image
                      : "mrokrrlw2ssnr3tf3vy2"
                  }
                  height={150}
                  width={150}
                  alt="profile"
                />
              );
            }}
          </CldUploadWidget>
        ) : (
          <CldImage
            className="m-auto cursor-pointer rounded-full h-[150px]"
            src={
              grpdetails?.profile_image
                ? grpdetails?.profile_image
                : "mrokrrlw2ssnr3tf3vy2"
            }
            height={150}
            width={150}
            alt="dummy"
          />
        )}
      </div>
      <div className="pt-8 border-b border-[#36404A] pb-4 mx-8">
        <p className="text-center text-2xl text-white">
          {activeChat.group_chat ? grpdetails?.name : grpdetails?.user_name}
        </p>

        {activeChat.group_chat && (
          <p className="text-center text-sm pt-2 text-[#ddd]">
            Group: {grpMembers?.length} members
          </p>
        )}
      </div>
      {grpdetails?.description && (
        <div className="pt-4">
          <p className="px-8 text-xl text-white">Description</p>
          <p className="px-8 text-sm pt-2 text-[#ddd]">
            {grpdetails?.description}{" "}
          </p>
        </div>
      )}
      {activeChat.group_chat && (
        <div className="flex items-center pt-4 ">
          <p className="px-8  text-xl text-white">Group Members</p>
          {/* second phase */}
          {/* <p className="text-sm  cursor-pointer border-2  px-2 rounded-md border-[#337ab7] m-0  text-[#337ab7]">
            + Add
          </p> */}
        </div>
      )}

      {grpMembers.map((element: any) => {
        return (
          <div className="pt-4 mx-8">
            <div
              className="bg-[#36404A] flex flex-row py-2 px-3 cursor-pointer "
              key={element._id}
            >
              <div className="flex ">
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
                <div className="flex gap-10 items-center justify-between ms-4">
                  <p className="text-lg text-white">{element.user_name}</p>

                  {grpdetails?.admins[0] === element._id && (
                    <p className="text-sm border-2  px-2 rounded-md border-[#337ab7] m-0  text-[#337ab7]">
                      {" "}
                      admin
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default GroupInfo;
