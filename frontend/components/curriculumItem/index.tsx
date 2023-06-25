import React from "react";
import Image1 from "@/assets/curriculumItem1.png";
// import Image2 from "@/assets/curriculumItem2.png";
import Image, { StaticImageData } from "next/image";

export interface CurriculumItemProps {
    image: StaticImageData;
    metadata: string;
}

const CurriculumItem = ({ metadata, image }: CurriculumItemProps) => {
    return (
        <div className="flex gap-4 items-center">
            <Image src={Image1} width={40} height={40} className="rounded" alt={metadata} />
            <div className="flex flex-col">
                <h3 className="text-sm font-medium">{metadata}</h3>
            </div>
        </div>
    );
};

export default CurriculumItem;
