import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("DarkModeContext used outside of provider.");
  return context;
};

export default useDarkMode;
