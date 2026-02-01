/*type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  disabled = false,
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded font-medium transition";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled
          ? "opacity-50 cursor-not-allowed hover:bg-inherit"
          : ""
      }`}
    >
      {children}
    </button>
  );
}*/
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className, // Extract className from props
  ...props   // Spread the rest (onClick, type, etc.)
}: ButtonProps) {
  
  const baseStyles = "transition-all duration-200 active:scale-95 font-bold";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200",
    danger: "bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}
