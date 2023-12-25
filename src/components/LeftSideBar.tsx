import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

export default function LeftSideBar() {
  return (
    <div className="bg-[#303841] h-screen max-w-[380px] min-w-[380px]">
      {/* <p className="text-2xl text-white font-semibold pt-8 pl-8"> Chats </p>
      <div className="flex flex-col p-6 gap-4 w-full">
        <div className="bg-[#36404A] py-2 px-5 rounded-md flex items-center gap-2 w-full">
          <input
            type="text"
            placeholder="Search"
            className="text-white bg-transparent w-full focus:outline-none placeholder:text-white"
          />
          <FontAwesomeIcon icon={faSearch} color="white" />
        </div>

        <div className="flex flex-col mt-2 gap-4">
          <div className="bg-[#36404A] flex py-2 px-3 justify-between">
            <Image
              src="/images/profile-dummy.svg"
              height={45}
              width={45}
              alt="dummy"
            />
            <div className="flex flex-col">
              <p className="text-lg text-white">Yash</p>
              <p className="text-[#455A64] text-sm">Hello! how are you</p>
            </div>
            <div>
              <p className="text-[#455A64] text-sm mt-2">2:50 PM</p>
            </div>
          </div>
          <div className="bg-[#36404A] flex py-2 px-3 justify-between">
            <Image
              src="/images/profile-dummy.svg"
              height={45}
              width={45}
              alt="dummy"
            />
            <div className="flex flex-col">
              <p className="text-lg text-white">Yash</p>
              <p className="text-[#455A64] text-sm">Hello! how are you</p>
            </div>
            <div>
              <p className="text-[#455A64] text-sm mt-2">2:50 PM</p>
            </div>
          </div>
          <div className="bg-[#36404A] flex py-2 px-3 justify-between">
            <Image
              src="/images/profile-dummy.svg"
              height={45}
              width={45}
              alt="dummy"
            />
            <div className="flex flex-col">
              <p className="text-lg text-white">Yash</p>
              <p className="text-[#455A64] text-sm">Hello! how are you</p>
            </div>
            <div>
              <p className="text-[#455A64] text-sm mt-2">2:50 PM</p>
            </div>
          </div>
        </div>
      </div> */}
      <Profile/>
      
    </div>
  );
}
