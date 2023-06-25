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
import { toast } from "react-toastify";
import { axios } from "@/config/axios";

const Student = ({ params }: { params: { wallet: string } }) => {
    const [loading, setLoading] = React.useState(true);

    const getInfo = async () => {
        try {
            axios.get('/students/')
        } catch (error) {
            console.log(error);
            toast.error("Erro ao carregar dados do estudante");
        }
        setLoading(false);
    };

    React.useEffect(() => {
        getInfo();
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
