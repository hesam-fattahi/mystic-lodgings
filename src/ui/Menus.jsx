import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical as MenuIcon } from "react-icons/hi2";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [position, setPosition] = useState(null);

  const close = () => setActiveMenuId(null);
  const open = setActiveMenuId;

  return (
    <MenusContext.Provider
      value={{ activeMenuId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { activeMenuId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e) => {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    !activeMenuId || activeMenuId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <MenuIcon />
    </StyledToggle>
  );
};

const List = ({ id, children }) => {
  const { activeMenuId, position, close } = useContext(MenusContext);
  const ref = useClickOutside(close, false);

  if (activeMenuId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.25rem;
  border-radius: 50%;
  transform: translateX(0.5rem);
  transition: all 0.2s;

  & svg {
    font-size: 1.5rem;
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-tertiary);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1rem;

  & svg {
    font-size: 1rem;
  }
`;

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
