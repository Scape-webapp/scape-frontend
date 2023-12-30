import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { patchProfileDetails } from "@/services/api.service";

function EditProfile({setIsEdit,updateProfileDetails}:{setIsEdit:any,updateProfileDetails:any}) {
  const [editDetails, setEditDetails] = useState({
    user_name:"",
    name: "",
    email: "",
    description: "",
  });
   const getUserDetails = async () => {
     try {
      const { data } = await patchProfileDetails({id:"658dbcdfe88244a974676e05"}); 
      setEditDetails(data);
      console.log(data)
     
    } catch (error) {
      console.log(error)
    }
   }

  useEffect(() => {
    
    getUserDetails();
  }, []);

   const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await patchProfileDetails({
        id: "658dbcdfe88244a974676e05",
        data: editDetails,
      });
      updateProfileDetails(editDetails);
      
      console.log(editDetails)
      console.log("Profile details updated successfully!");
    } catch (error) {
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
            value={editDetails?.user_name || ""}
            onChange={(e) => handleChange(e)}
            placeholder="Username"
            name="user_name"
            className="text-white bg-transparent w-full focus:outline-none placeholder:text-[#909DAB]"
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
