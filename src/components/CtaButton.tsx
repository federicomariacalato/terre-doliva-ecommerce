import { Link } from "react-router";

type CtaButtonProps = {
  btnText: string;
  variant?: "dark" | "light";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function CtaButton({
  btnText,
  variant = "dark",
  href,
  onClick,
  disabled,
}: CtaButtonProps) {
  const baseStyles = `inline-block font-sans text-[13px] uppercase tracking-[0.14em] font-medium
                      px-9 py-4 transition-colors duration-300 cursor-pointer text-center`;

  const variantStyles = {
    dark: "bg-glow text-deep hover:bg-ground",
    light: "bg-deep text-ground hover:bg-oil w-full rounded-md",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]}`;

  const disabledStyles = `disabled:cursor-not-allowed disabled:bg-line disabled:text-mute
                          disabled:hover:bg-line disabled:hover:text-mute`;

  if (href) {
    return (
      <Link to={href} onClick={onClick} className={combinedClasses}>
        {btnText}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${combinedClasses} ${disabledStyles}`}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
}
