import { forwardRef } from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);
