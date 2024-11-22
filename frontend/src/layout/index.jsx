import Chat_card from "@/components/cards/chat-card";
import Layout_search from "@/layout/layout-search";
import { Data } from "@/db";
import React from "react";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="w-full overflow-hidden mx-auto h-screen flex justify-center items-center">
      <div className="layout border-r w-[25%] max-desktopXLL:w-[35%] max-desktop:w-[45%] max-mobile:w-full h-full relative overflow-hidden ">
        <Layout_search />
        <div className="shop-scrol px-2 w-full flex flex-wrap h-full overflow-hidden overflow-y-scroll pb-20 pt-2 ">
          {Data.map((el, i) => (
            <Chat_card {...el} key={i} />
          ))}
        </div>
      </div>
      <div className="bgimg w-[75%] max-desktopXLL:w-[65%] max-desktop:w-[55%] max-mobile:w-0 h-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
