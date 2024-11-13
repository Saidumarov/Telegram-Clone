import Chat_content, { chat } from "@/components/chats/chat-content";
import Chat_header from "@/components/chats/chat-header";
import Chat_input from "@/components/chats/chat-input";
import CustomContextMenu from "@/components/chats/chat-menu";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();
  const [ChatData, setChatData] = useState(chat);
  const [isVisible, setIsVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenuPosition({ x: event.pageX, y: event.pageY });
    setIsVisible(true);
  };
  return (
    <div className="w-full   h-full overflow-hidden">
      <Chat_header />
      <Chat_content menu={handleContextMenu} data={{ ChatData, isVisible }} />
      <Chat_input state={{ ChatData, setChatData, id }} />
      <CustomContextMenu state={{ isVisible, setIsVisible, menuPosition }} />
    </div>
  );
};

export default Chat;
