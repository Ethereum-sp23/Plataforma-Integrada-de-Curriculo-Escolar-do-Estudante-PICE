import React from "react";
import { Leaf, X } from "lucide-react";
import Backdrop from "../backdrop";
import { AnimatePresence, Variants, motion } from "framer-motion";

const container: Variants = {
    hidden: { opacity: 0, scale: 0, translateX: "-50%", translateY: "-50%", transition: {
        duration: 0.4,
        ease: "easeInOut",
    } },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        },
    },
};

interface Props {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    showModal: boolean;
    closeModal: () => void;
}

const Modal: React.FC<Props> = ({
    title,
    showModal,
    subtitle,
    children,
    closeModal,
}) => {
    return (
        <>
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        variants={container}
                        animate="visible"
                        initial="hidden"
                        exit="hidden"
                        className="z-20 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-10 rounded-lg min-w-[35vw]"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-3xl">{title}</h4>
                            <X
                                size={30}
                                className="cursor-pointer hover:scale-110 transition-all"
                                onClick={closeModal}
                            />
                        </div>
                        <div>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>

            {showModal && <Backdrop closeModal={closeModal} />}
        </>
    );
};

export default Modal;