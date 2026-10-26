import { CtaButton } from "./CtaButton";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

type HeroProps = {
  subtitle: string;
  title: string;
  bgImage: string;
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
  showScrollIndicator?: boolean;
};

export const Hero = ({
  subtitle,
  title,
  bgImage,
  showCta = true,
  ctaText,
  ctaHref,
  showScrollIndicator = true,
}: HeroProps) => {
  return (
    <section className="relative w-full h-screen min-h-[640px] bg-deep text-ground overflow-hidden">
      <div className="absolute inset-y-0 right-0 left-0 lg:left-[round(54%,1px)] overflow-hidden">
        <img
          src={bgImage}
          alt="Sfondo Hero"
          className="w-full h-full object-cover animate-[drift_30s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-deep via-deep/40 to-deep/60 lg:bg-linear-to-r lg:from-deep lg:from-3% lg:via-deep/10 lg:to-transparent"></div>
      </div>

      <Stagger className="relative z-10 h-full flex flex-col justify-end lg:justify-center px-6 md:px-12 lg:px-20 pt-40 pb-28 lg:pb-0">
        <StaggerItem
          as="span"
          className="font-serif italic text-lg md:text-xl text-glow mb-6 block"
        >
          {subtitle}
        </StaggerItem>
        <StaggerItem
          as="h1"
          className="font-serif text-[clamp(2.5rem,6.4vw,6.75rem)] leading-[0.98] tracking-[-0.02em] font-normal max-w-[16ch] lg:max-w-[13ch] mb-12"
        >
          {title}
        </StaggerItem>

        {showCta && ctaText && (
          <StaggerItem className="self-start">
            <CtaButton btnText={ctaText} href={ctaHref} variant="dark" />
          </StaggerItem>
        )}
      </Stagger>

      {showScrollIndicator && (
        <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 z-10 flex items-center gap-4 text-ground/60">
          <div className="w-12 h-px bg-ground/40"></div>
          <span className="font-sans text-[13px] tracking-[0.08em]">
            Scorri
          </span>
        </div>
      )}
    </section>
  );
};
