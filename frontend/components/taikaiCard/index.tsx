import { AvatarImage } from "@taikai/rocket-kit";
import Link from "next/link";
import React from "react";

interface TaikaiCardProps {
    title: string;
    id: number;
    infos?: string[];
}

const TaikaiCard = ({ title, id, infos }: TaikaiCardProps) => {
    return (
        <Link href={"/student/" + id} className="hover:-translate-y-2 transition-all">
            <div className="min-h-[200px] border rounded-lg overflow-hidden p-8">
                <div className="mb-4">
                    <AvatarImage
                        alt="Person"
                        boring
                        boringType="pixel"
                        size={100}
                        url=""
                        className="transform-y-[50%]"
                    />
                </div>
                <p className="text-lg font-bold mb-4">{title}</p>
                {infos &&
                    infos.map((info, index) => (
                        <p key={index} className="text-sm text-gray-500 break-words">
                            {info}
                        </p>
                    ))}
            </div>
        </Link>
    );
};

export default TaikaiCard;
