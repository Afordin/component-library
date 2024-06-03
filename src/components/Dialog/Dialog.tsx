import { useEffect, useId, useRef } from "react";
import { Button } from "../Button/Button";
import { createPortal } from "react-dom";

type DialogProps = {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
  showCloseButton: boolean;
  isOpen: boolean;
  handleClose: () => void;
};

export const Dialog = ({
  header,
  footer,
  children,
  showCloseButton,
  isOpen,
  handleClose,
}: DialogProps) => {
  const id = useId();
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        handleClose();
      }
    };

    document.body.addEventListener("keydown", handleEscape);

    return () => {
      document.body.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const handleOnClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      if (!(event.target instanceof Node)) return;
      if (modal.contains(event.target)) return;

      handleClose();
    };

    modal.addEventListener("click", handleOnClickOutside);

    return () => {
      modal.removeEventListener("click", handleOnClickOutside);
    };
  }, [handleClose, isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <dialog
      ref={modalRef}
      open={isOpen}
      aria-labelledby={id}
      className="absolute inset-0"
    >
      <header id={id} className="flex items-center">
        <div className="flex-1">{header}</div>
        {showCloseButton && (
          <Button aria-label="Close the modal" onClick={handleClose}>
            &times;
          </Button>
        )}
      </header>
      <>{children}</>
      <footer>{footer}</footer>
    </dialog>,
    document.body
  );
};
