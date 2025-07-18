import React from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  shape?: "circle" | "square" | "rounded";
  fallback?: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  status?: "online" | "offline" | "away" | "busy";
  showStatus?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "md",
  shape = "circle",
  fallback,
  className = "",
  onClick,
  status,
  showStatus = false,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-20 h-20 text-2xl",
  };

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-none",
    rounded: "rounded-lg",
  };

  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  const statusSizes = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
    "2xl": "w-5 h-5",
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const renderFallback = () => {
    if (typeof fallback === "string") {
      return (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 font-medium">
          {fallback.slice(0, 2).toUpperCase()}
        </div>
      );
    }
    return fallback;
  };

  const renderContent = () => {
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      );
    }
    return renderFallback();
  };

  return (
    <div className="relative inline-block">
      <div
        className={`
          ${sizeClasses[size]}
          ${shapeClasses[shape]}
          ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}
          ${className}
        `}
        onClick={onClick}
      >
        {renderContent()}
      </div>
      
      {showStatus && status && (
        <div
          data-testid="status-indicator"
          className={`
            absolute -bottom-0.5 -right-0.5
            ${statusSizes[size]}
            ${statusClasses[status]}
            ${shapeClasses[shape]}
            border-2 border-white
          `}
        />
      )}
    </div>
  );
};

export default Avatar; 