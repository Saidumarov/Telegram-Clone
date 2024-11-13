import { FaPhone } from "react-icons/fa6";
import img from "../../assets/c.jpg";
const Chat_header = () => {
  return (
    <div className="w-full cursor-pointer flex justify-between items-center px-10 bg-[#080e1f] h-[7%] overflow-hidden">
      <div className="flex h-full items-center gap-2 ">
        <img src={img} alt="" className="w-12 h-12 rounded-full" />
        <div>
          <p className="text-[18px] font-medium leading-3">Css darstlari</p>
          <p className="text-[16px] ">yozmoqda...</p>
        </div>
      </div>
      <div className="h-full flex items-center">
        <FaPhone className="text-[20px] text-white/80 cursor-pointer" />
      </div>
    </div>
  );
};
export default Chat_header;
