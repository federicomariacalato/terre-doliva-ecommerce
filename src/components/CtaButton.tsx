type CtaButtonProps = {
  btnText: string;
};

export function CtaButton({ btnText }: CtaButtonProps) {
  return (
    <a
      href="/shop"
      className="inline-block font-sans text-xs uppercase tracking-widest font-semibold bg-[#fbf9f4] text-[#2c3e2b] px-9 py-4 border border-[#fbf9f4] hover:bg-transparent hover:text-[#fbf9f4] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg cursor-pointer"
    >
      {btnText}
    </a>
  );
}
