import { faArrowRightLong, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Image from "next/image";
import EditProfile from "./EditProfile";

function Profile() {
  const [isEdit, setIsEdit] = useState("");
  return (
    <div>
      {!isEdit && (
      <><p className="text-2xl text-white font-semibold pt-8 px-8 flex justify-between items-center">
          Profile
          <FontAwesomeIcon
            onClick={() => { setIsEdit("editProfile")} }
            className="cursor-pointer"
            icon={faPen}
            size="xs" />
        </p><div className="px-8 mt-10 pb-5 border-b border-[#36404A] ">
            <Image
              className="m-auto"
              src="/images/profile-dummy.svg"
              height={80}
              width={80}
              alt="dummy" />
            <p className="text-white text-2xl text-center pt-5">Yash Bhanushali</p>
            <p className="text-white text-lg text-center">yashbhanu2412</p>
            <p className="text-white text-lg text-center pt-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div><div className="px-8 py-5">
            <div className="pb-3">
              <p className="text-white text-lg">Email</p>
              <p className="text-white text-sm ">bhanushaliyash2000@gmail.com</p>
            </div>
            <div className="pb-3">
              <p className="text-white text-lg">Joined At</p>
              <p className="text-white text-sm ">Jan 24 2022</p>
            </div>
          </div><div className="text-white text-lg cursor-pointer px-8 pb-5 absolute bottom-0 flex items-center gap-2">
            Logout <FontAwesomeIcon icon={faArrowRightLong} size="lg" />
          </div></>
      )}
      {isEdit==="editProfile" && (
      <EditProfile />
      )}

    </div>
  );
}

export default Profile;
