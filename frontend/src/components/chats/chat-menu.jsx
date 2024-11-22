import { useRef, useEffect } from "react";
const CustomContextMenu = ({ state }) => {
  const { isVisible, setIsVisible, menuPosition } = state;
  const menuRef = useRef(null);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div
          ref={menuRef}
          className="context-menu"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <div className="context-menu-item">⭐ Yulduzcha qo'shish</div>
          <div className="context-menu-item">📝 Javob yozish</div>
          <div className="context-menu-item">📋 Nusxa olish</div>
          <div className="context-menu-item">📌 Qadash</div>
          <div className="context-menu-item">🗑️ O'chirish</div>
          <div className="context-menu-item">✅ Tanlash</div>
        </div>
      )}
    </>
  );
};

export default CustomContextMenu;
