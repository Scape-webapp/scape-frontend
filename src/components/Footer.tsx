import React from "react";
import Image from "next/image";
import scapeWhiteLogo from "../../public/scape_logo_white.svg";

function Footer() {
  return (
    <div className="md:mt-10">
      <div className="bg-[#343A40] px-5 md:px-10 py-10">
        <div className="grid md:grid-cols-2 items-center pb-10 md:pb-20 border-b-2 border-[#7083FF]">
          <div className="text-white text-2xl md:text-3xl flex font-bold text-center items-center gap-3">
            <Image
              src={scapeWhiteLogo}
              alt="logo_white"
              width={40}
              height={40}
            />
            Scape
          </div>
          <div className="grid grid-cols-2 mt-10 md:mt-0">
            <div className="grid gap-4">
              <p className="text-[#7083FF] text-xl cursor-pointer">Company</p>
              <p className="text-[#ffffff] text-xl cursor-pointer">About us</p>
              <p className="text-[#ffffff] text-xl cursor-pointer">Blog</p>
            </div>
            <div className="grid gap-4">
              <p className="text-[#7083FF] text-xl cursor-pointer">Policies</p>
              <p className="text-[#ffffff] text-xl cursor-pointer">Terms</p>
              <p className="text-[#ffffff] text-xl cursor-pointer">Services</p>
            </div>
          </div>
        </div>
        <div className="text-white text-xl md:text-xl py-5 font-bold">
          Copyright © 2023 Scape
        </div>
      </div>
    </div>
  );
}
export default Footer;
