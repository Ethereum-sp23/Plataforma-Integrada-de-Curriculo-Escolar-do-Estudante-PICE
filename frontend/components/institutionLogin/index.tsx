import { Button, ErrorField, ModalDrawer, ModalFooter, TextField } from "@taikai/rocket-kit";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../input";

const schema = yup.object({
    email: yup.string().required("Esse campo é obrigatório."),
    password: yup.string().required("Esse campo é obrigatório."),
});

export type Inputs = {
    email: string;
    password: string;
};

interface InstitutionLoginProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstitutionLogin = ({ setShowModal, showModal }: InstitutionLoginProps) => {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        router.push("/institution");
    };

    const closeModal = () => {
        reset();
        setShowModal(false);
    };

    return (
        <ModalDrawer hide={closeModal} isShowing={showModal} title="Login" footerHidden>
            <p className="mb-4">Faça login com a sua conta de instituição</p>

            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Input control={control} errors={errors} name="email" placeholder="Email" />
                <Input control={control} type="password" errors={errors} name="password" placeholder="Password" />

                <div className="flex gap-4 justify-end">
                    <Button
                        action={closeModal}
                        type="submit"
                        value="Fechar"
                        color="blue500"
                        variant="outline"
                        className="self-end"
                    />
                    <Button
                        action={function noRefCheck() {}}
                        type="submit"
                        value="Submit"
                        color="blue500"
                        className="self-end"
                    />
                </div>
            </form>
        </ModalDrawer>
    );
};

export default InstitutionLogin;
