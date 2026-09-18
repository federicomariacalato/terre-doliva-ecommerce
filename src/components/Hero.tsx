import { CtaButton } from "./CtaButton";

type HeroProps = {
  subtitle: string;
  title: string;
  bgImage: string;
  showCta?: boolean;
  ctaText?: string;
  showScrollIndicator?: boolean;
};

export const Hero = ({
  subtitle,
  title,
  bgImage,
  showCta = true,
  ctaText,
  showScrollIndicator = true,
}: HeroProps) => {
  return (
    <section className="relative w-full h-screen bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={bgImage}
          alt="Sfondo Hero"
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_8s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <span className="font-sans text-xs uppercase tracking-widest text-[#fbf9f4]/80 mb-4 block font-medium">
          {subtitle}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#fbf9f4] font-light tracking-wide leading-tight mb-8">
          {title}
        </h1>

        {showCta && ctaText && <CtaButton btnText={ctaText} />}
      </div>

      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-[#fbf9f4]/60 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-sans text-[10px] uppercase tracking-widest">
            Scorri
          </span>
          <div className="w-px h-8 bg-[#fbf9f4]/40"></div>
        </div>
      )}
    </section>
  );
};
