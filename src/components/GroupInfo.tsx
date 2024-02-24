import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { CldImage } from "next-cloudinary";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect,useState } from "react";
import { GroupInfoApi } from "@/services/api.service";

const GroupInfo=({activeGrpChat,activeChat,
groupInfoVisible,
setgroupInfoVisible}:{activeGrpChat:any,
groupInfoVisible:any ,activeChat,:any
setgroupInfoVisible:Function})=>{
    const [imgPublicId, setImgPulicId] = useState("");
    const [grpdetails, setGrpdetails] = useState<any>([]);
    const [grpMembers, setGrpMembers] = useState([]);

    const getGroupInfoList = async () => {
    try {
      const info = await GroupInfoApi(activeGrpChat);
      let grpInfo:any = info.data;
      setGrpdetails(grpInfo[0]);
      setGrpMembers(grpInfo[0].grpmember)
      console.log(grpInfo);
    } catch (error) {
      // add fail toast later
      console.log("error in chat list api : ", error);
    }
  };
  useEffect(() => {
    getGroupInfoList ();
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
            Group Info
          </p>
        </div>
        <div className="pt-8">
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
                  src={
                    grpdetails?.profile_image
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
        </div>
        <div className="pt-8 border-b border-[#36404A] pb-4 mx-8">
          <p className="text-center text-2xl text-white">{grpdetails?.name}</p>
          <p className="text-center text-sm pt-2 text-[#ddd]">
            Group: {grpMembers?.length} members
          </p>
        </div>
        {grpdetails?.description && (
          <div className="pt-4">
            <p className="px-8 text-xl text-white">Description</p>
            <p className="px-8 text-sm pt-2 text-[#ddd]">
              {grpdetails?.description}{" "}
            </p>
          </div>
        )}
        <p className="px-8 pt-4 text-xl text-white">Group Members</p>

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
                  <div className="flex justify-center align-center ms-4">
                    <p className="text-lg text-white">{element.user_name}</p>

                    {grpdetails.admins[0] === element._id && (
                      <p className="text-lg text-white"> admin</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
}
export default GroupInfo;