import useDarkMode from "../hooks/useDarkMode";
import Button from "./Button";

import {
  HiOutlineMoon as DarkModeIcon,
  HiOutlineSun as LightModeIcon,
} from "react-icons/hi2";

const DarkModeButton = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button iconOnly onClick={toggleDarkMode}>
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </Button>
  );
};

export default DarkModeButton;
