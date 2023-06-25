import React from "react";

interface Props {
    closeModal: () => void;
}

const Backdrop: React.FC<Props> = ({ closeModal }) => {
    return (
        <div
            onClick={closeModal}
            className="z-10 w-[100vw] h-[100vh] top-0 left-0 right-0 bottom-0 fixed  bg-gray-800/50 backdrop-blur-[2px]"
        ></div>
    );
};

export default Backdrop;