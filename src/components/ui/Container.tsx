interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  noPadding?: boolean; 
}

export function Container({ 
  children, 
  className = "", 
  size = "lg",
  noPadding = false
}: ContainerProps) {
  const sizeMap = {
    sm: "max-w-2xl", 
    md: "max-w-4xl", 
    lg: "max-w-6xl", 
    xl: "max-w-7xl", 
  };

  const paddingClasses = noPadding ? "" : "px-4 sm:px-6 lg:px-8"; 

  return (
    <div className={`${sizeMap[size]} mx-auto ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
}