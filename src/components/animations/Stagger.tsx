import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.5, delayChildren: 0.5 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 2.2, ease: EASE_OUT },
  },
};

const tags = {
  div: motion.div,
  span: motion.span,
  h1: motion.h1,
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
};

export function Stagger({ children, className }: StaggerProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  as?: keyof typeof tags;
  className?: string;
};

export function StaggerItem({
  children,
  as = "div",
  className,
}: StaggerItemProps) {
  const Tag = tags[as];

  return (
    <Tag variants={item} className={className}>
      {children}
    </Tag>
  );
}
