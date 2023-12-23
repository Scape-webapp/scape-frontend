import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faGear, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function Sidebar() {
  enum activeBar {
    CHAT = "chat",
    GROUPCHAT = "groupChat",
    PROFILE = "profile",
    SETTING = "setting",
  }

  const [activeTab, setActiveTab] = useState<activeBar>(activeBar.CHAT);

  const changeTab = (tab: activeBar) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-[#36404A] h-screen min-w-[75px] max-w-[75px] pt-16 py-4">
      <div className="flex flex-col items-center justify-center gap-12">
        <Image
          src="/logos/scape-logo.svg"
          alt="scape-logo"
          width={35}
          height={35}
        />
        <FontAwesomeIcon
          icon={faComments}
          color={activeTab === activeBar.CHAT ? "#7083FF" : "#787E83"}
          onClick={() => changeTab(activeBar.CHAT)}
          className="cursor-pointer text-2xl"
        />
        <FontAwesomeIcon
          icon={faUserGroup}
          color={activeTab === activeBar.GROUPCHAT ? "#7083FF" : "#787E83"}
          onClick={() => changeTab(activeBar.GROUPCHAT)}
          className="cursor-pointer text-2xl"
        />
        <FontAwesomeIcon
          icon={faUser}
          color={activeTab === activeBar.PROFILE ? "#7083FF" : "#787E83"}
          onClick={() => changeTab(activeBar.PROFILE)}
          className="cursor-pointer text-2xl"
        />
        <FontAwesomeIcon
          icon={faGear}
          color={activeTab === activeBar.SETTING ? "#7083FF" : "#787E83"}
          onClick={() => changeTab(activeBar.SETTING)}
          className="cursor-pointer text-2xl"
        />
      </div>
    </div>
  );
}
