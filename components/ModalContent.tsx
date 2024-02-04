import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import React from "react";

type ModalContentProps = {
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
};
export default function ModalContent({
  closeModal,
  title,
  children,
}: ModalContentProps) {
  const handleClose = () => {
    if (window.screen.width < 768) {
      return;
    }
    // closeModal();
    return;
  };
  return (
    <Dialog
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
      onClose={handleClose}
      open={true}
    >
      <div className="flex flex-col justify-center h-full px-1 pt-4 text-center sm:block sm:p-0">
        <Dialog.Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="fixed inset-0 bg-background/25 backdrop-blur-md"
        />
        <motion.div
          initial={{ y: "100%" }}
          animate={{
            y: 0,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            y: "100%",
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="flex justify-center mt-3"
        >
          <Dialog.Panel className="w-full max-w-lg rounded-lg bg-background text-left shadow-xl p-3">
            <div className="w-full flex justify-between border-b border-border mb-1 py-2 px-3">
              <h3 className="text-xl font-medium leading-6">{title}</h3>
              <button
                type="button"
                onClick={() => {
                  closeModal();
                }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-style p-3 mb-6">
              {children}
            </div>
          </Dialog.Panel>
        </motion.div>
      </div>
    </Dialog>
  );
}
