import { motion } from "motion/react";
import { CtaButton } from "./CtaButton";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.4, delayChildren: 0.4 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: EASE_OUT },
  },
};

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
    <section className="relative w-full h-screen bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={bgImage}
          alt="Sfondo Hero"
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_8s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40"></div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16"
      >
        <motion.span
          variants={item}
          className="font-sans text-xs uppercase tracking-widest text-[#fbf9f4]/80 mb-4 block font-medium"
        >
          {subtitle}
        </motion.span>
        <motion.h1
          variants={item}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#fbf9f4] font-light tracking-wide leading-tight mb-8"
        >
          {title}
        </motion.h1>

        {showCta && ctaText && (
          <motion.div variants={item}>
            <CtaButton btnText={ctaText} href={ctaHref} />
          </motion.div>
        )}
      </motion.div>

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
