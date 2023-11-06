import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  variant?: "default" | "error";
};

export const Button: React.FC<ButtonProps> = ({
  className: _,
  children,
  icon,
  variant,
  ...rest
}) => {
  const bgColor = variant === "default" ? "bg-blue-500" : "bg-red-500";
  const shadowColor =
    variant === "default" ? "shadow-blue-500/60" : "shadow-red-500/60";
  const borderColor =
    variant === "default" ? "border-blue-500" : "border-red-500";

  return (
    <button
      className={`min-w-[100px] inline-flex justify-center items-center space-x-2 px-4 py-2 rounded-md ${bgColor} text-white text-sm capitalize font-semibold border ${borderColor} shadow-md ${shadowColor} disabled:bg-gray-300 
      disabled:border-gray-300 disabled:shadow-gray-300/60 disabled:text-gray-500`}
      {...rest}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

Button.defaultProps = {
  variant: "default",
};
