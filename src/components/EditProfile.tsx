import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Image from "next/image";

function EditProfile() {
  return (
    <div>
      <p className="text-2xl text-white font-semibold pt-8 px-8 flex justify-between items-center">
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={faArrowLeftLong}
          size="lg"
        />
        Edit Profile
      </p>
      <div className="px-8 py-5">
        <Image
          className="m-auto"
          src="/images/profile-dummy.svg"
          height={80}
          width={80}
          alt="dummy"
        />
        <p className="text-white text-lg pb-2">Username</p>
        <div className="bg-[#36404A] py-2 px-5  rounded-[8px] flex items-center gap-2 w-full">
          <input
            type="text"
            placeholder="Username"
            className="text-white bg-transparent w-full focus:outline-none placeholder:text-[#909DAB]"
          />
        </div>
        <p className="text-white text-lg py-2">Name</p>
        <div className="bg-[#36404A] py-2 px-5 rounded-[8px] flex items-center gap-2 w-full">
          <input
            type="text"
            placeholder="Name"
            className="text-white bg-transparent w-full focus:outline-none placeholder:text-[#909DAB]"
          />
        </div>
        <p className="text-white text-lg py-2">Email</p>
        <div className="bg-[#36404A] py-2 px-5 rounded-[8px] flex items-center gap-2 w-full">
          <input
            type="text"
            placeholder="Email"
            className="text-white bg-transparent w-full focus:outline-none placeholder:ttext-[#909DAB]"
          />
        </div>
        <p className="text-white text-lg py-2">Description</p>
        <div className="bg-[#36404A] py-2 px-5 rounded-[8px] flex items-center gap-2 w-full">
          <textarea
            placeholder="Type here"
            className="text-white bg-transparent w-full focus:outline-none placeholder:text-[#909DAB]"
          />
        </div>
        <div className="m-auto my-10 text-center">
          <button className="bg-[#7083FF]  rounded-[20px] px-10 py-2 font-bold cursor-pointer shadow-md hover:bg-[#343A40] hover:text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
