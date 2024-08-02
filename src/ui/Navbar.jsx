import { NavLink } from "react-router-dom";
import styled from "styled-components";

import {
  HiOutlineHome as DashboardIcon,
  HiOutlineCalendarDays as BookingsIcon,
  HiOutlineHomeModern as CabinsIcon,
  HiOutlineUsers as UsersIcon,
  HiOutlineCog8Tooth as SettingsIcon,
} from "react-icons/hi2";

const Navbar = ({ isOpen, closeNav }) => {
  return (
    <NavContainer isOpen={isOpen}>
      <Brand>Mystic Lodgings</Brand>

      <NavList>
        <NavItem role="button" onClick={closeNav}>
          <StyledNavLink to="/dashboard">
            <DashboardIcon />
            <span>Dashboard</span>
          </StyledNavLink>
        </NavItem>

        <NavItem role="button" onClick={closeNav}>
          <StyledNavLink to="/bookings">
            <BookingsIcon />
            <span>Bookings</span>
          </StyledNavLink>
        </NavItem>

        <NavItem role="button" onClick={closeNav}>
          <StyledNavLink to="/cabins">
            <CabinsIcon />
            <span>Cabins</span>
          </StyledNavLink>
        </NavItem>

        <NavItem role="button" onClick={closeNav}>
          <StyledNavLink to="/users">
            <UsersIcon />
            <span>Users</span>
          </StyledNavLink>
        </NavItem>

        <NavItem role="button" onClick={closeNav}>
          <StyledNavLink to="/settings" role="button" onClick={closeNav}>
            <SettingsIcon />
            <span>Settings</span>
          </StyledNavLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  background-color: var(--color-bg-primary);
  overflow: hidden;
  grid-area: navbar;
  height: 100%;

  border-right: 1px solid var(--color-bg-tertiary);
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    height: calc(100% - 2.625rem);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1000;
    border: none;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`;

const NavList = styled.ul`
  margin: auto 0;
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.li`
  margin: 0.375rem 0;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-text-tertiary);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.75rem 2rem;
  position: relative;

  ::after {
    content: "";
    width: 4px;
    height: 0%;
    background-color: var(--color-accent-purple);
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    box-shadow: -0.5rem 0 3rem 1rem transparent;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: 0.3s ease-out;
  }

  & svg {
    font-size: 1.5rem;
  }

  &.active {
    color: var(--color-text-primary);

    ::after {
      height: 60%;
      box-shadow: -0.5rem 0 3rem 1rem var(--color-accent-purple);
    }
  }

  @media (max-width: 768px) {
    ::after {
      display: none;
    }
  }
`;

const Brand = styled.p`
  font-size: 1.375rem;
  font-weight: 600;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Navbar;
