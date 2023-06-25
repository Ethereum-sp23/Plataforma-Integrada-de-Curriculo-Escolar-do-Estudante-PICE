import React from "react";
import GoldMedal from "@/assets/goldMedal.png";
import SilverMedal from "@/assets/silverMedal.png";
import BronzeMedal from "@/assets/bronzeMedal.png";
import MedalItem, { MedalItemProps } from "../medalItem";

const Medals = () => {
    const medals: MedalItemProps[] = [
        { image: GoldMedal, number: 1 },
        { image: SilverMedal, number: 2 },
        { image: BronzeMedal, number: 3 },
    ];

    return <div className="flex gap-4">
        {medals.map((medal) => (
            <MedalItem key={medal.number} {...medal} />
        ))}
    </div>;
};

export default Medals;
