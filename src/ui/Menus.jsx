import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [opsition, setPosition] = useState({ x: 0, y: 0 });
  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, open, close, setPosition, opsition }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { close, open, openId, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const positionBTN = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - positionBTN.width - positionBTN.x,
      y: positionBTN.y + positionBTN.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <StyledToggle onClick={handleClick} id={id}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, opsition, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);
  const { x, y } = opsition;

  if (openId !== id) return null;
  return createPortal(
    <StyledList ref={ref} position={{ x, y }}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <StyledButton onClick={handleClick} as="button">
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
