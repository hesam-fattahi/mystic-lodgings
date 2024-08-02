import { HiOutlineArrowRightOnRectangle as LogoutIcon } from "react-icons/hi2";

import useLogout from "./useLogout";
import Button from "../../ui/Button";

// Component: Logout
const Logout = () => {
  const { logout, isLoggingOut } = useLogout();

  return (
    <Button variant="danger" onClick={logout} iconOnly isLoading={isLoggingOut}>
      <LogoutIcon />
    </Button>
  );
};

export default Logout;
