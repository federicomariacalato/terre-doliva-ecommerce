import { Link } from "react-router";

type CtaButtonProps = {
  btnText: string;
  variant?: "dark" | "light";
  href?: string;
  onClick?: () => void;
};

export function CtaButton({
  btnText,
  variant = "dark",
  href,
  onClick,
}: CtaButtonProps) {
  const baseStyles = `inline-block font-sans text-xs uppercase tracking-widest font-semibold 
                      border px-9 py-4 transition-all duration-300 transform 
                      hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg 
                      cursor-pointer hover:bg-transparent text-center`;

  const variantStyles = {
    dark: "bg-[#fbf9f4] text-[#2c3e2b] border-[#fbf9f4] hover:text-[#fbf9f4]",
    light:
      "bg-[#2c3e2b] text-[#fbf9f4] border-[#2c3e2b] hover:text-[#2c3e2b] w-full rounded-lg",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]}`;

  if (href) {
    return (
      <Link to={href} onClick={onClick} className={combinedClasses}>
        {btnText}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClasses}>
      {btnText}
    </button>
  );
}
