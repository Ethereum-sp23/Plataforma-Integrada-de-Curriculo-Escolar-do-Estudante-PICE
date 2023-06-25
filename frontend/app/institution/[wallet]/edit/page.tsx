"use client";
import React from "react";
import Image from "next/image";
import StudentHeader from "@/components/studentHeader";
import Card from "@/components/card";
import CurriculumItem from "@/components/curriculumItem";
import { curriculumItems, studentInfoItems } from "./data";
import { LoadingState } from "@taikai/rocket-kit";
import EditStudent from "@/components/editStudent";

const Student = ({ params }: { params: { wallet: string } }) => {
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
            <div className="flex gap-6 m-6">
                <Card title="Histórico de atividades" classes="grow">
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
                <EditStudent params={params} />
            </div>
        </div>
    );
};

export default Student;
