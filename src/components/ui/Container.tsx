interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl"; // Add size variants
}

export function Container({ 
  children, 
  className = "", 
  size = "lg" 
}: ContainerProps) {
  const sizeMap = {
    sm: "max-w-2xl",      // 42rem / 672px
    md: "max-w-4xl",      // 56rem / 896px
    lg: "max-w-6xl",      // 64rem / 1024px
    xl: "max-w-7xl",      // 80rem / 1280px
  };

  return (
    <div className={`${sizeMap[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}