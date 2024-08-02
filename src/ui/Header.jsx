import styled from "styled-components";

import {
  HiOutlineBars2 as MenuIcon,
  HiOutlineXMark as CloseIcon,
} from "react-icons/hi2";
import Row from "./Row";
import DarkModeButton from "./DarkModeButton";
import Avatar from "../features/authentication/Avatar";
import Button from "./Button";
import Logout from "../features/authentication/Logout";

const Header = ({ toggleNavbar, isNavbarOpen, children }) => {
  return (
    <StyledHeader as="header" justify="space-between" items="center">
      <Row items="center" gap="0.125rem">
        <MenuButton iconOnly onClick={toggleNavbar}>
          {isNavbarOpen ? <CloseIcon /> : <MenuIcon />}
        </MenuButton>
        <Brand>Mystic Lodgings</Brand>
      </Row>
      <Row items="center" gap="0.125rem">
        <Avatar />
        <Logout />
        <DarkModeButton />
      </Row>
    </StyledHeader>
  );
};

const StyledHeader = styled(Row)`
  width: 100%;
  z-index: 10;
  padding: 1rem 2rem;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
    border-bottom: 1px solid var(--color-bg-secondary);
  }
`;

const Brand = styled.div`
  display: none;
  font-weight: 700;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuButton = styled(Button)`
  display: none;

  & svg {
    color: inherit;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

export default Header;
