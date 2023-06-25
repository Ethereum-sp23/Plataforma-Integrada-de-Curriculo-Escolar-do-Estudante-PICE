import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../input";
import Card from "../card";
import { Button, LoadingState } from "@taikai/rocket-kit";
import { axios } from "@/config/axios";
import { toast } from "react-toastify";

const CreateInstitution = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({});
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            await axios.post("/government/createSchool", data);
            toast.success("Instituição cadastrada com sucesso");
            reset();
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        setLoading(false);
    };

    return (
        <Card title="Cadastrar uma instituição" classes="grow">
            <p >A ação de criar uma instituição pode demorar. O sistema está criando uma carteira na blockchain e atrelando-a a uma instituição de ensino.</p>
            {!loading ? (
                <form className="flex flex-col gap-4 m-8" onSubmit={handleSubmit(onSubmit)}>
                    <Input control={control} name="name" errors={errors} placeholder="Digite um nome..." />
                    <Input control={control} name="email" errors={errors} placeholder="Digite um email..." />
                    <Input
                        control={control}
                        name="password"
                        type="password"
                        errors={errors}
                        placeholder="Digite uma senha..."
                    />
                    <div className="flex justify-center">
                        <Button
                            className="button hover:scale-105 transition mx-auto"
                            color="blue500"
                            icon="organization"
                            iconPosition="right"
                            txtColor="blue500"
                            value="Cadastrar"
                            variant="outline"
                            type="submit"
                        />
                    </div>
                </form>
            ) : (
                <LoadingState cardsNumber={8} center lines={14} type="text" />
            )}
        </Card>
    );
};

export default CreateInstitution;
