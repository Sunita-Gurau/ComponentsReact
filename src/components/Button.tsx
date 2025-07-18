import React from "react";

export type ButtonProps = {
  variant?: "filled" | "outlined" | "ghost";
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  size?: "md";
  children: React.ReactNode;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  className?: string;
  type?: "button" | "submit" | "reset";
  color?: string; // Tailwind color name, e.g. 'blue', 'red', 'green'
};

const baseStyles = "inline-flex items-center justify-center font-medium rounded transition-colors duration-200 gap-2 select-none";
const focusStyles = "focus:outline-none focus:ring-2 focus:ring-offset-2";

const sizeStyles: Record<string, string> = {
  md: "h-10 px-5 text-sm",
};

function getVariantStyles(variant: string, color: string) {
  switch (variant) {
    case "filled":
      return [
        `bg-${color}-500`,
        `text-white`,
        `active:bg-${color}-700`,
        `disabled:bg-${color}-100`,
        `disabled:text-${color}-300`,
      ].join(" ");
    case "outlined":
      return [
        `border`,
        `border-${color}-500`,
        `text-${color}-500`,
        `bg-white`,
        `active:bg-${color}-700`,
        `active:text-white`,
        `disabled:border-${color}-100`,
        `disabled:text-${color}-200`,
      ].join(" ");
    case "ghost":
      return [
        `bg-transparent`,
        `text-${color}-500`,
        `active:bg-${color}-700`,
        `active:text-white`,
        `disabled:text-${color}-200`,
      ].join(" ");
    default:
      return "";
  }
}

const spinner = (
  <svg className="animate-spin ml-1 h-4 w-4 text-inherit" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" opacity="0.2" />
    <path d="M15 8A7 7 0 0 0 8 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const plusIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  variant = "filled",
  disabled = false,
  icon,
  loading = false,
  size = "md",
  children,
  onClick,
  className = "",
  type = "button",
  color = "blue",
}) => {
  const isDisabled = disabled || loading;
  // Special hover style for filled buttons with icon, only if not loading
  const filledWithIconHover = variant === "filled" && icon && !loading
    ? `hover:bg-white hover:text-${color}-500 active:bg-${color}-50`
    : "";
  return (
    <button
      type={type}
      className={[
        baseStyles,
        sizeStyles[size],
        getVariantStyles(variant, color),
        variant === "filled" ? focusStyles : "",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      {/* Icon on the left */}
      {icon && !loading && <span className="mr-2 -ml-1 flex items-center">{icon}</span>}
      {children}
      {/* Spinner on the right if loading */}
      {loading && <span className="ml-2 flex items-center">{spinner}</span>}
    </button>
  );
};

// For convenience, export the plus icon
export const PlusIcon = plusIcon; 