import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
const Chat_card = ({ id, name, message, img }) => {
  return (
    <Button
      style={{
        textTransform: "none",
      }}
      className="raduis !min-w-0 !mt-1 !p-0 h-[70px] !border-none  !w-full !text-white"
    >
      <NavLink
        to={`/${id}`}
        className={`!w-full !h-full rounded-lg cursor-pointer  duration-150 hover:bg-secondary/50 !flex px-2   !items-center`}
      >
        <div>
          <img
            src={img}
            alt=""
            className="!h-[90%] p-[1px] w-[60px] rounded-full"
          />
        </div>
        <div className="pl-3 w-auto">
          <h3 className="!line-clamp-1 text-left leading-6  !ont-medium !text-[18px]">
            {name}
          </h3>
          <p className="!line-clamp-1 leading-6 text-left !text-[14px]">
            {message}
          </p>
        </div>
      </NavLink>
    </Button>
  );
};

export default Chat_card;
