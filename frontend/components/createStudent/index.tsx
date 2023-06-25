import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../input";
import Card from "../card";
import { Button, LoadingState } from "@taikai/rocket-kit";
import { axios } from "@/config/axios";
import { toast } from "react-toastify";

const CreateStudent = () => {
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
            await axios.post("/government/createPerson", data);
            toast.success("Estudante cadastrado com sucesso");
            reset();
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        setLoading(false);
    };

    return (
        <Card title="Cadastrar um estudante" classes="grow">
            <p>
                A ação de criar um estudante pode demorar. O sistema está criando uma carteira na blockchain e
                atrelando-a ao recém criado estudante.
            </p>
            {!loading ? (
                <form className="flex flex-col gap-4 m-8" onSubmit={handleSubmit(onSubmit)}>
                    <Input control={control} name="name" errors={errors} placeholder="Digite um nome..." />
                    <Input control={control} name="email" errors={errors} placeholder="Digite um email..." />
                    <Input control={control} name="course" errors={errors} placeholder="Digite um curso..." />
                    <div className="flex justify-center">
                        <Button
                            className="button hover:scale-105 transition mx-auto"
                            color="blue500"
                            icon="user-o"
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

export default CreateStudent;
