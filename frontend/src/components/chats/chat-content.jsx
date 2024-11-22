import { useEffect, useRef } from "react";
export const chat = [
  {
    id: 1,
    text: "Hello world",
    date: "20:03",
    userId: 1,
  },
  {
    id: 2,
    text: "Hello world dunyo",
    date: "20:05",
    userId: 2,
  },
  {
    id: 1,
    text: "Hello world",
    date: "20:07",
    userId: 1,
  },
  {
    id: 2,
    text: "Hello world qali",
    date: "20:09",
    userId: 2,
  },
  {
    id: 2,
    text: "Hello world qali",
    date: "20:09",
    userId: 2,
  },
  {
    id: 1,
    text: "Hello world",
    date: "20:07",
    userId: 1,
  },
  {
    id: 1,
    text: "Hello world",
    date: "20:03",
    userId: 1,
  },
];
const Chat_content = ({ menu, data }) => {
  const { ChatData, isVisible } = data;
  // bg-[#080e1fb6]
  // Scrollni nazorat qilish uchun ref yarating
  const chatRef = useRef(null);

  // Har safar ChatData o'zgarganda scroll-ni pastga tushirish
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [ChatData]);
  return (
    <div className="w-full   h-[85%] overflow-hidden">
      <div
        ref={chatRef}
        className="chat_c   overflow-y-scroll flex flex-col-reverse h-full mx-auto"
      >
        <div className="w-full">
          {ChatData.map((el, i) => (
            <div
              onContextMenu={menu}
              key={i}
              className={`flex mb-3 px-[295px] max-desktopXLL:px-[200px] max-desktopLL:px-[150px] max-desktop:px-5 ${
                el.userId == 1 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`text-white  rounded-2xl pb-1.5 px-2 py-1 max-w-[30vw] ${
                  el.userId == 1
                    ? "bg-gray-800 rounded-bl-none"
                    : "bg-[#7669c7] rounded-br-none"
                }`}
              >
                <p>{el.text}</p>
                <span className="text-zinc-300 text-xs float-right mt-1">
                  {el.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat_content;
