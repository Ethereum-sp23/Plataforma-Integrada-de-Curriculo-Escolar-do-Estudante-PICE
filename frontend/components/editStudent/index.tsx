import React from "react";
import Card from "../card";
import { Controller, SubmitHandler, set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import Input from "../input";
import { Button, FilePicker } from "@taikai/rocket-kit";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/auth";
import { axios } from "@/config/axios";

interface EditStudentProps {
    params: { id: string };
}

const schema = yup.object({
    name: yup.string().required("Esse campo é obrigatório."),
});

export type Inputs = {
    name: string;
};

const EditStudent = ({ params }: EditStudentProps) => {
    const { account } = useAuth();
    const [file, setFile] = React.useState<File | null>(null);
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!file) {
            return toast.error("Você precisa selecionar um arquivo.");
        }
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        bodyFormData.append("metadata", data.name);
        bodyFormData.append("studentId", params.id);
        bodyFormData.append("schoolAuth", account as string);

        try {
            const res = await axios.post("/school/createNFT", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        toast.success("Atividade criada com sucesso.")
            console.log(res);
        } catch (error) {
            console.log(error);
            toast.error("Ocorreu um erro ao criar o NFT.");
        }
    };

    return (
        <Card title="Adicionar atividade" classes="min-w-[30%]">
            <p>Adicione uma nova atividade ao aluno. </p>
            <p className="text-sm mt-2">
                <span className="font-medium">Exemplo:</span> Curso Extracurricular de Inglês.
            </p>
            <form className="w-full flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Nome" control={control} errors={errors} name="name" />
                <FilePicker
                    onChange={(e) => e.target.files && setFile(e.target.files[0])}
                    buttonText="Procurar"
                    error=""
                    name="file"
                    placeholder="Escolha um arquivo"
                    pluralText="Arquivos selecionados"
                />

                <Button type="submit" value="Submit" color="blue500" className="self-end" />
            </form>
        </Card>
    );
};

export default EditStudent;
