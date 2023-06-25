import React from "react";

interface Props {
    children: React.ReactNode;
    title?: string;
    classes?: string;
    titleLg?: boolean;
}

const Card = ({ children, title, classes, titleLg }: Props) => {
    return (
        <div className={`sm:min-h-0 bg-white rounded-lg p-6 shadow ${classes && classes}`}>
            {title && <h3 className={`${titleLg ? "text-2xl" : "text-lg"} font-bold mb-4`}>{title}</h3>}
            {children}
        </div>
    );
};

export default Card;
