import React, { useEffect, useState } from "react";
import IsiProfile from "../components/IsiProfile";

function Profile({iconList}) {
  return (
    <div>
      <div
        id="menu"
        className="bg-gray-50 p-2 h-screen overflow-y-auto scroll-none"
      >
        <div className="">
          <IsiProfile iconList={iconList}/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
