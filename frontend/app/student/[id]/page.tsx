"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import StudentHeader from "@/components/studentHeader";
import Card from "@/components/card";
import CurriculumItem, { CurriculumItemProps } from "@/components/curriculumItem";
import { LoadingState } from "@taikai/rocket-kit";
import { toast } from "react-toastify";
import { axios } from "@/config/axios";

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
            <StudentHeader student={student} loading={loading} />
            <Card classes="m-6" title="Histórico de atividades">
                {!loading ? (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        { badges.length > 0 ? badges.map((item, index) => (
                            <CurriculumItem key={index} metadata={item.metadata} image={item.image} />
                        )) : (
                            <p>Nenhuma atividade encontrada</p>
                        )}
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
