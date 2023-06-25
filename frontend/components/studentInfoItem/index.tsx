import React from "react";

export interface StudentInfoItemProps {
    label: string;
    value: string;
}

const StudentInfoItem = ({ label, value }: StudentInfoItemProps) => {
    return (
        <div className="flex justify-between items-center">
            <p className="text-sm">{label}</p>
            <p className="text-xs text-gray-500">{value}</p>
        </div>
    );
};

export default StudentInfoItem;
