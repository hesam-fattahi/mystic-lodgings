import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark as CloseIcon } from "react-icons/hi2";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";
import Button from "../ui/Button";

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: opensWindowName }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
};

const Window = ({ children, name, title }) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useClickOutside(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <div>
          <ModalHeader>
            <h3>{title}</h3>
            <Button iconOnly onClick={close}>
              <CloseIcon />
            </Button>
          </ModalHeader>
          <ModalBody>
            {cloneElement(children, { onCloseModal: close })}
          </ModalBody>
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

const StyledModal = styled.div`
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-tertiary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  transition: all 0.5s;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ModalHeader = styled.header`
  border-bottom: 1px solid var(--color-bg-tertiary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.375rem;
`;

const ModalBody = styled.div`
  padding: 2rem 2.5rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: -webkit-fill-available;
  background-color: rgba(107, 107, 107, 0.05);
  backdrop-filter: blur(8px);
  z-index: 1000;
  padding: 0.5rem;
  transition: all 0.5s;
  overflow-y: auto;
  display: grid;
  place-items: center;
`;

Modal.Open = Open;
Modal.Window = Window;
Modal.Button = Button;

export default Modal;
