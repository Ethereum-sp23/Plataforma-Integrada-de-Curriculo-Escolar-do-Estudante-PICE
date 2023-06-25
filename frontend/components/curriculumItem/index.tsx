import React from "react";
import Image1 from "@/assets/curriculumItem1.png";
import Image2 from "@/assets/curriculumItem2.png";
import Image, { StaticImageData } from "next/image";

export interface CurriculumItemProps {
    image: StaticImageData;
    title: string;
    subtitle: string;
}

const CurriculumItem = ({ title, subtitle, image }: CurriculumItemProps) => {
    return (
        <div className="flex gap-4 items-center">
            <Image src={image} width={40} height={40} alt={title} />
            <div className="flex flex-col">
                <h3 className="text-sm font-medium">{title}</h3>
                <h4 className="text-xs font-light">{subtitle}</h4>
            </div>
        </div>
    );
};

export default CurriculumItem;
