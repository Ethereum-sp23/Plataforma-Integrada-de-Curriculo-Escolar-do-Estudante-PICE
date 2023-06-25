import { AvatarImage } from "@taikai/rocket-kit";
import Link from "next/link";
import React from "react";

interface TaikaiCardProps {
    title: string;
    id: number;
}

const TaikaiCard = ({ title, id }: TaikaiCardProps) => {
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
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod provident distinctio tempore
                    aspernatur iusto, deleniti deserunt minima labore vero omnis inventore optio accusamus aut, dolorem,
                    exercitationem ad nesciunt officia quia.
                </p>
            </div>
        </Link>
    );
};

export default TaikaiCard;
