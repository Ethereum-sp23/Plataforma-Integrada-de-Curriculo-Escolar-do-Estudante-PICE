"use client";
import React from "react";
import Image from "next/image";
import StudentHeader from "@/components/studentHeader";
import Card from "@/components/card";
import CurriculumItem, { CurriculumItemProps } from "@/components/curriculumItem";
import { curriculumItems, studentInfoItems } from "./data";
import StudentInfoItem from "@/components/studentInfoItem";
import Medals from "@/components/medals";
import { LoadingState } from "@taikai/rocket-kit";

const Student = () => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="bg-gray-300 h-full pb-4 min-h-[100vh]">
            <StudentHeader />
            <Card classes="m-6" title="Histórico de atividades">
                {!loading ? (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {curriculumItems.map((item, index) => (
                            <CurriculumItem key={index} {...item} />
                        ))}
                    </div>
                ) : (
                    <LoadingState cardsNumber={8} center lines={14} type="text" />
                )}
            </Card>
            {/* <Card classes="m-6">
                <div className="flex flex-col gap-2">
                    {studentInfoItems.map((item, index) => (
                        <StudentInfoItem key={index} {...item} />
                    ))}
                </div>
            </Card>
            <Card classes="m-6" title="Medalhas">
                <Medals />
            </Card> */}
        </div>
    );
};

export default Student;
