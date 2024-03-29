import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { patchProfileDetails } from "@/services/api.service";
import { getProfileDetails } from "@/services/api.service";
import { AppDispatch, RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { toast } from "react-toastify";

function EditProfile({
  setIsEdit,
  onEditSubmit,
}: {
  setIsEdit: any;
  onEditSubmit: () => void;
}) {
  const [userName, setUserName] = useState({
    user_name: "",
  });
  const [editDetails, setEditDetails] = useState({
    name: "",
    email: "",
    description: "",
    profile_image: "",
  });
  const [imgPublicId, setImgPulicId] = useState("");

  const user: any = useSelector((state: RootState) => state.user.user);
  const profileData = async () => {
    const resp: any = await getProfileDetails(user._id);
    setUserName({ user_name: resp.data.user_name });
    setEditDetails({
      name: resp.data.name,
      email: resp.data.email,
      description: resp.data.description,
      profile_image: resp.data.profile_image,
    });
  };

  useEffect(() => {
    profileData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const resp: any = await patchProfileDetails({
        ...editDetails,
        ...userName,
        id: user._id,
        profile_image: imgPublicId ? imgPublicId : editDetails.profile_image,
      });
      setIsEdit("");
      toast.success("Profile details updated successfully!");
      onEditSubmit();       
    } catch (error:any) {
      toast.error(error.response.data.message || "Something went wrong!");
      console.error("Error updating profile details:", error);
    }
  };

  const handleChange = (event: any) => {
    setEditDetails({
      ...editDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <p className="text-2xl text-white font-semibold pt-8 px-8 flex justify-between items-center">
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={faArrowLeftLong}
          onClick={() => setIsEdit("")}
          size="lg"
        />
        Edit Profile
      </p>
      <form onSubmit={handleSubmit}>
        <div className="px-8 pt-5">
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
                  className="m-auto cursor-pointer rounded-full h-[80px]"
                  src={
                    imgPublicId
                      ? imgPublicId
                      : editDetails.profile_image
                      ? editDetails.profile_image
                      : "mrokrrlw2ssnr3tf3vy2"
                  }
                  height={80}
                  width={80}
                  alt="dummy"
                />
              );
            }}
          </CldUploadWidget>

          {/* will update this filed with redux state */}
          <p className="text-white text-lg pb-2">Username</p>
          <div className="bg-[#40474e] py-2 px-5  rounded-[8px] flex items-center gap-2 w-full">
            <input
              type="text"
              value={userName.user_name || ""}
              onChange={(e) => handleChange(e)}
              disabled
              placeholder="Username"
              name="user_name"
              className="text-[#787e83] bg-transparent w-full focus:outline-none placeholder:text-[#909DAB]"
            />
          </div>
          <p className="text-white text-lg py-2">Name</p>
          <div className="bg-[#36404A] py-2 px-5 rounded-[8px] flex items-center gap-2 w-full">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editDetails?.name || ""}
              onChange={(e) => handleChange(e)}
              className="text-white bg-transparent w-full focus:outline-none placeholder:text-[#909DAB]"
            />
          </div>
          <p className="text-white text-lg py-2">Email</p>
          <div className="bg-[#36404A] py-2 px-5 rounded-[8px] flex items-center gap-2 w-full">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={editDetails?.email || ""}
              onChange={(e) => handleChange(e)}
              className="text-white bg-transparent w-full focus:outline-none placeholder:ttext-[#909DAB]"
            />
          </div>
          <p className="text-white text-lg py-2">Description</p>
          <div className="bg-[#36404A] py-2 px-5 rounded-[8px] flex items-center gap-2 w-full">
            <textarea
              name="description"
              placeholder="Type here"
              value={editDetails?.description || ""}
              onChange={(e) => handleChange(e)}
              className="text-white bg-transparent w-full focus:outline-none placeholder:text-[#909DAB]"
            />
          </div>
          <div className="m-auto my-10 text-center">
            <button className="bg-[#7083FF]  rounded-[20px] px-10 py-2 font-bold cursor-pointer shadow-md hover:bg-[#343A40] hover:text-white">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
