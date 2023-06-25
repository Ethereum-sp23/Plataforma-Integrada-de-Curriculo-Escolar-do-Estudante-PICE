import { Icon } from "@taikai/rocket-kit";
import Link from "next/link";
import React from "react";

interface ActionItemProps {
    label: string;
    icon: string;
    link: string;
}

const ActionItem = ({ icon, label, link }: ActionItemProps) => {
    return (
        <Link href={link}>
            <div className="flex gap-4 p-2 px-4 items-center hover:bg-gray-200 transition-all">
                <Icon icon={icon} fill="" className="w-4 h-4" />
                {label}
            </div>
        </Link>
    );
};

export default ActionItem;
