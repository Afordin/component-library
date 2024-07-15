import { useId, useRef, useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  arrow,
} from "@floating-ui/react";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  withArrow: boolean;
};

export const Tooltip = ({ content, children, withArrow }: TooltipProps) => {
  const [isToggled, setIsToggled] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isToggled,
    onOpenChange: setIsToggled,
    placement: "top",
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      arrow({
        element: arrowRef,
      }),
      shift(),
    ],
  });

  // Event listeners to change the open state
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const id = useId();
  const tooltipId = `tooltip-${id}`;

  return (
    <>
      <div
        aria-describedby={tooltipId}
        tabIndex={0}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {children}
      </div>
      <FloatingPortal>
        {isToggled && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="text-black rounded-[1px] px-2 py-1 bg-white"
          >
            {withArrow && (
              <FloatingArrow
                width={7}
                height={5}
                ref={arrowRef}
                context={context}
                fill="#fff"
                tipRadius={2}
              />
            )}
            <div id={tooltipId} role="tooltip">
              {content}
            </div>
          </div>
        )}
      </FloatingPortal>
    </>
  );
};
