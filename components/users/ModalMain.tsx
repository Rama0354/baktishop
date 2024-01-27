import React from "react";
import { motion } from "framer-motion";
import BackdropComponent from "./BackdropComponent";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export default function ModalMain({
  children,
  handleClose,
}: {
  children: React.ReactNode;
  handleClose: () => void;
}) {
  return (
    <BackdropComponent onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        className="relative p-4 w-full max-w-2xl max-h-full"
        initial="hidden"
        animate="visible"
        exit="exit"
        aria-hidden="true"
      >
        {children}
      </motion.div>
    </BackdropComponent>
  );
}
