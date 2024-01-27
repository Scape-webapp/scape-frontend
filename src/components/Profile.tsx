"use client";
import { faArrowRightLong, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Image from "next/image";
import EditProfile from "./EditProfile";
import { useParams, useRouter } from "next/navigation";
import { getProfileDetails } from "@/services/api.service";
import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/features/user-slice";
import { CldImage } from 'next-cloudinary';
type UserDetails = {
  user_name: string;
  description: string;
  email: string;
  createdAt: string;
  name: string;
  _id: string;
  profile_image:string;
};

function Profile() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isEdit, setIsEdit] = useState("");
  
  const [details, setDetails] = useState<UserDetails>();
  const user = useSelector((state: RootState) => state.user.user);

  const profileData = async () => {
    try {
      const response = await getProfileDetails(user._id);
      setDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    profileData();
  }, []);

  async function handleLogout() {
    dispatch(logout());
    router.push("/login");
  }
  async function handleEditSubmit() {
    
    setIsEdit(() => {
      profileData();
    });
  }

  return (
    <div>
      {!isEdit && (
        <>
          <p className="text-2xl text-white font-semibold pt-8 px-8 flex justify-between items-center">
            Profile
            <FontAwesomeIcon
              onClick={() => {
                setIsEdit("editProfile");
              }}
              className="cursor-pointer"
              icon={faPen}
              size="xs"
            />
          </p>
          <div className="px-8 mt-10 pb-5 border-b border-[#36404A] ">
                        <CldImage                    
                    className="m-auto cursor-pointer rounded-full h-[80px]"
                    src={details?.profile_image?details?.profile_image:'mrokrrlw2ssnr3tf3vy2'}
                    height={80}
                    width={80}
                   alt="dummy"
                  />
          
            <p className="text-white text-2xl text-center pt-5">
              @{details?.user_name}
            </p>
            <p className="text-white text-lg text-center">{details?.name}</p>
            <p className="text-white text-lg text-center pt-3">
              {details?.description}
            </p>
          </div>
          <div className="px-8 py-5">
            {details?.email?(<>
            <div className="pb-3">
              <p className="text-white text-lg">Email</p>
              <p className="text-white text-sm ">{details?.email}</p>
            </div></>):(<></>)}
            
            <div className="pb-3">
              <p className="text-white text-lg">Joined At</p>
              <p className="text-white text-sm ">
                {moment(details?.createdAt).format("DD MMM YYYY").toString()}
              </p>
            </div>
          </div>
          <div
            className="text-white text-lg cursor-pointer px-8 pb-5 absolute bottom-0 flex items-center gap-2"
            onClick={handleLogout}
          >
            Logout <FontAwesomeIcon icon={faArrowRightLong} size="lg" />
          </div>
        </>
      )}
      {isEdit === "editProfile" && (
        <EditProfile setIsEdit={setIsEdit} onEditSubmit={handleEditSubmit} />
      )}
    </div>
  );
}

export default Profile;
