import React from "react";

interface Props {
    children: React.ReactNode;
    title?: string;
    classes?: string
    titleLg?: boolean
}

const Card = ({ children, title, classes, titleLg }: Props) => {
    return (
        <div className={`bg-white rounded-lg p-4 shadow ${classes && classes}`}>
            {title && <h3 className={`${titleLg ? 'text-2xl' : 'text-lg'} font-medium mb-4`}>{title}</h3>}
            {children}
        </div>
    );
};

export default Card;
