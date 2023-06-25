import { Button, ErrorField, ModalDrawer, ModalFooter, TextField } from "@taikai/rocket-kit";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../input";
import { toast } from "react-toastify";
import { axios } from "@/config/axios";
import { useAuth } from "@/contexts/auth";
import { DappKitFunctions } from "@/utils/dappKitFunctions";
import { on } from "events";

const schema = yup.object({
    email: yup.string().required("Esse campo é obrigatório."),
    password: yup.string().required("Esse campo é obrigatório."),
});

export type Inputs = {
    email: string;
    password: string;
};

interface LoginModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    loginEndpoint?: string;
    redirect: string;
    onlyMetamask?: boolean;
}

const LoginModal = ({ setShowModal, redirect, showModal, loginEndpoint, onlyMetamask }: LoginModalProps) => {
    const router = useRouter();
    const { connectMetamask, setAccount } = useAuth();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (!loginEndpoint) return;

            const response = await axios.post(loginEndpoint, data);
            setAccount(data.email)
            localStorage.setItem("account", data.email);
            toast.success("Login feito com sucesso");
            router.push(redirect);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    const closeModal = () => {
        reset();
        setShowModal(false);
    };

    const connectWithMetamask = async () => {
        const addrs = await connectMetamask();
        const instance = new DappKitFunctions();
        try {
            if (onlyMetamask) {
                const res = await instance.userGetTransaction("government");
                // Doing the different operator to make the admin dashboard accessible for everyone
                if (res != addrs) {
                    toast.success("Login feito com sucesso");
                    router.push(redirect);
                    return;
                }
                toast.error("Essa não é a carteira do governo");
            } else {
                const res = await instance.userGetTransaction("schools", [addrs]);

                if (res) {
                    toast.success("Login feito com sucesso");
                    router.push(redirect);
                    return;
                }
                toast.error("Essa conta não está cadastrada na plataforma");
            }
        } catch (error) {
            toast.error("Erro ao conectar com a Metamask");
            console.error(error);
        }
    };

    return (
        <ModalDrawer
            hide={closeModal}
            footer={
                <Button
                    action={closeModal}
                    type="submit"
                    value="Fechar"
                    color="blue500"
                    variant="outline"
                    className="self-end"
                />
            }
            isShowing={showModal}
            title="Login"
        >
            <p className="mb-8 text-lg">Faça login com a sua conta</p>

            {!onlyMetamask && (
                <>
                    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <Input control={control} errors={errors} name="email" placeholder="Email" />
                        <Input
                            control={control}
                            type="password"
                            errors={errors}
                            name="password"
                            placeholder="Password"
                        />

                        <div className="flex gap-4 justify-end">
                            <Button
                                action={function noRefCheck() {}}
                                type="submit"
                                value="Submit"
                                color="blue500"
                                className="self-end"
                            />
                        </div>
                    </form>

                    <p className="uppercase text-center my-8">ou</p>
                </>
            )}
            <div className="flex justify-center">
                <Button
                    className="button hover:scale-105 transition mx-auto"
                    color="blue500"
                    icon="metamask"
                    iconPosition="right"
                    txtColor="blue500"
                    value="Login com metamask"
                    variant="outline"
                    action={connectWithMetamask}
                />
            </div>
        </ModalDrawer>
    );
};

export default LoginModal;
