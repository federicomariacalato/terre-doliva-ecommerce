import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

type RevealUpProps = {
  children: ReactNode;
  index?: number;
  className?: string;
};

export function RevealUp({ children, index = 0, className }: RevealUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 1.4, ease: EASE_OUT, delay: index * 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
