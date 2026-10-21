import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  from?: "left" | "right";
  className?: string;
};

export function Reveal({ children, from = "right", className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from === "right" ? 80 : -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -120px 0px" }}
      transition={{ duration: 1.8, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
