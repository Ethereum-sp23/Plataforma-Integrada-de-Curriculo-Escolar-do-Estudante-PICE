"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import StudentHeader from "@/components/studentHeader";
import Card from "@/components/card";
import CurriculumItem from "@/components/curriculumItem";
import { LoadingState } from "@taikai/rocket-kit";
import EditStudent from "@/components/editStudent";
import { axios } from "@/config/axios";
import { toast } from "react-toastify";

interface Badge {
    image: string;
    metadata: string;
}

const Student = ({ params }: { params: { id: string } }) => {
    const [loading, setLoading] = React.useState(true);

    const [student, setStudent] = React.useState(null);

    const [badges, setBadges] = React.useState<Badge[]>([]);

    const getInfo = async () => {
        try {
            const res = await axios.get("/student/getStudentById/" + params.id);
            setStudent(res.data.data);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao carregar dados do estudante");
        }
        setLoading(false);
    };

    const getBadges = async () => {
        try {
            const res = await axios.get("/student/getAllNfts/" + params.id);
            setBadges(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao carregar dados do estudante");
        }
    };

    React.useEffect(() => {
        Promise.all([getInfo(), getBadges()]).then(() => setLoading(false));
    }, []);

    return (
        <div className="bg-gray-300 h-full pb-4 min-h-[100vh]">
            <StudentHeader loading={loading} student={student} />
            <div className="flex gap-6 m-6">
                <Card title="Histórico de atividades" classes="grow">
                    {!loading ? (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {badges.map((item, index) => (
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
