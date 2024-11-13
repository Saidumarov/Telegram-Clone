import { Button, Input } from "@mui/material";
import { FaBars } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
const Layout_search = () => {
  return (
    <div className="w-full h-16 shadow-md bg-secondary/20 flex items-center px-5 justify-between sticky top-0 left-0  ">
      <Button className="!min-w-0 h-10 !rounded-full w-10 hover:bg-secondary ">
        <FaBars className="text-gray-200 text-[18px]" />
      </Button>
      <div className="w-[88%]  h-10 flex items-center">
        <div className="bg-secondary rounded-tl-full rounded-bl-full h-[36px] w-10 flex items-center justify-center ml-[1px] absolute z-10">
          <IoSearchOutline className="text-[18px]" />
        </div>
        <Input
          className="w-full bg-secondary h-10 rounded-full pl-11 overflow-hidden border-none !text-white"
          placeholder="Qidruv"
        />
      </div>
    </div>
  );
};

export default Layout_search;
