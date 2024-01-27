import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="********"
        suffix={
          showPassword ? (
            <EyeOpenIcon
              className="select-none w-6 h-6"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeNoneIcon
              className="select-none w-6 h-6"
              onClick={() => setShowPassword(true)}
            />
          )
        }
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
