"use client";
import ActionItem from "@/components/actionItem";
import Card from "@/components/card";
import CreateInstitution from "@/components/createInstitution";
import CreateStudent from "@/components/createStudent";
import Modal from "@/components/modal";
import SeeSchools from "@/components/seeSchools";
import SeeStudent from "@/components/seeStudents";
import React from "react";
import AsyncSelect from "../../components/asyncSelect";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axios } from "@/config/axios";
import { Button } from "@taikai/rocket-kit";

const GovernmentDashboard = () => {
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({});

    const openModal = (id: string) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setLoading(false);
        setSelectedId(null);
        setShowModal(false);
        reset();
    };

    const onSubmit = async (data: any) => {
        setLoading(true);
        const schoolIds = data.schoolIds.map((school: any) => school.value);
        const reqData = {
            studentId: selectedId,
            schoolIds,
        };
        try {
            const response = await axios.post("/government/setStudent", reqData);
            toast.success("Operação realizada com sucesso!");
        } catch (error: any) {
            toast.error("Não foi possível realizar a operação.");
        }
        setLoading(false);
    };

    const actionItems = (id: string) => {
        return [<ActionItem key={1} icon="tune" label="Adicionar administrador" handler={() => openModal(id)} />];
    };

    return (
        <>
            <div className="flex flex-col gap-6 m-6">
                <SeeStudent actionItems={actionItems} link="/government/allStudents" />
                <SeeSchools />
            </div>
            <div className="flex gap-6 m-6 mb-0 pb-6">
                <CreateStudent />
                <CreateInstitution />
            </div>
            <Modal showModal={showModal} title="Adicionar administrador" closeModal={closeModal}>
                <form className="flex gap-4 items-end" onSubmit={handleSubmit(onSubmit)}>
                    <AsyncSelect
                        isMulti
                        label="Selecione um administrador"
                        link="/government/allSchools"
                        reload={showModal}
                        control={control}
                        name="schoolIds"
                    />
                    <Button
                        className="button hover:scale-105 transition mx-auto cursor-pointer"
                        color="blue500"
                        txtColor="blue500"
                        value="Cadastrar"
                        variant="outline"
                        type="submit"
                        loading={loading}
                    />
                </form>
            </Modal>
        </>
    );
};

export default GovernmentDashboard;
