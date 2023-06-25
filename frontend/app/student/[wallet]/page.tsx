import React from "react";
import Image from "next/image";
import StudentHeader from "@/components/studentHeader";
import Card from "@/components/card";
import CurriculumItem, { CurriculumItemProps } from "@/components/curriculumItem";
import { curriculumItems, studentInfoItems } from "./data";
import StudentInfoItem from "@/components/studentInfoItem";
import Medals from "@/components/medals";

const Student = () => {
    return (
        <div className="bg-gray-300 h-full pb-4">
            <StudentHeader />
            <Card classes="m-6" title="Histórico">
                <div className="flex flex-col gap-4">
                    {curriculumItems.map((item, index) => (
                        <CurriculumItem key={index} {...item} />
                    ))}
                </div>
            </Card>
            <Card classes="m-6">
                <div className="flex flex-col gap-2">
                    {studentInfoItems.map((item, index) => (
                        <StudentInfoItem key={index} {...item} />
                    ))}
                </div>
            </Card>
            <Card classes="m-6" title="Medalhas">
                <Medals />
            </Card>
        </div>
    );
};

export default Student;
