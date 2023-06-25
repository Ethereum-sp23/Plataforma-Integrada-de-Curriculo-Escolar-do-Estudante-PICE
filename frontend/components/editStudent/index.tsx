import React from "react";
import Card from "../card";
import { Controller, SubmitHandler, set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import Input from "../input";
import { Button, FilePicker } from "@taikai/rocket-kit";
import { toast } from "react-toastify";

const schema = yup.object({
    name: yup.string().required("Esse campo é obrigatório."),
});

export type Inputs = {
    name: string;
};

const EditStudent = () => {
    const router = useRouter();
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

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        if (!file) {
            return toast.error("Você precisa selecionar um arquivo.");
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
