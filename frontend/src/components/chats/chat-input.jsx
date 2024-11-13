import { formatTime } from "@/hooks/useDate";
import { useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
const Chat_input = ({ state }) => {
  const { ChatData, setChatData, id } = state;
  const [message, setMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (message) {
      const currentTime = new Date();
      const obj = {
        id: Math.floor(Math.random() * 1000000),
        text: message,
        date: formatTime(currentTime),
        userId: id,
      };
      setChatData([...ChatData, obj]);
      setMessage("");
    }
  };
  return (
    <div className="w-full relative  pt-1  h-[10%] overflow-hidden">
      <div className="w-[60%] flex relative  justify-between  mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex items-center relative bg-gray-900 text-gray-200 rounded-xl px-4 py-4 w-[90%]"
        >
          <span className="text-2xl">
            <FaRegSmile className="text-[24px] cursor-pointer" />
          </span>
          <input
            type="text"
            placeholder="Xabar"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="bg-transparent flex-grow px-4 text-white focus:outline-none"
          />
          <button type="button" className="text-gray-400 hover:text-gray-200">
            <GrAttachment className="text-[24px]" />
          </button>
          
        </form>
        <button className="text-gray-400 bg-gray-900 px-4 rounded-full">
          {message.trim() !== "" ? (
            <IoSend
              onClick={handleSubmit}
              className="text-[24px] text-[#7669c7] "
            />
          ) : (
            <FaMicrophone className="text-[24px]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Chat_input;
