import React from "react";

export enum BadgeType {
    PRIMARY = "primary",
    SUCCESS = "success",
    DANGER = "danger",
}

interface BadgeProps {
    type: BadgeType;
    children?: React.ReactNode;
}

const Badge = ({ type, children }: BadgeProps) => {
    const defaultClasses = "px-6 py-1 inline-block rounded text-white text-center";

    switch (type) {
        case BadgeType.PRIMARY:
            return <div className={`${defaultClasses} bg-blue-500`}>{children}</div>;
        case BadgeType.SUCCESS:
            return <div className={`${defaultClasses} bg-green-500`}>{children}</div>;
        case BadgeType.DANGER:
            return <div className={`${defaultClasses} bg-red-500`}>{children}</div>;
        default:
            return <div className={`${defaultClasses} bg-blue-500`}>{children}</div>;
    }
};

export default Badge;
