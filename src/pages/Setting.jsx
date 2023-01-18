import React, { useEffect, useState } from "react";
import IsiSetting from "../components/IsiSetting";

function Setting() {
  return (
    <div>
      <div
        id="menu"
        className="bg-gray-50 p-2 h-screen overflow-y-auto scroll-none"
      >
        <div className="">
          <IsiSetting />
        </div>
      </div>
    </div>
  );
}

export default Setting;
