import Image, { StaticImageData } from "next/image";
import React from "react";

export interface MedalItemProps {
    image: StaticImageData;
    number: number;
}

const MedalItem = ({ image, number }: MedalItemProps) => {
    return (
        <div className="flex gap-4 p-2 bg-[#F2F6F9] rounded-lg justify-center items-center grow">
            <Image src={image} width={30} height={30} alt="Medal" />
            <p className="text-md font-medium">{number}</p>
        </div>
    );
};

export default MedalItem;
