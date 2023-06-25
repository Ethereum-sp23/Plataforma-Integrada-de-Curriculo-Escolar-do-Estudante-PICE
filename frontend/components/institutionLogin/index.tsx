import { Button, ModalDrawer, ModalFooter, TextField } from "@taikai/rocket-kit";
import React, { useEffect, useRef } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string;
    password: string;
};

interface InstitutionLoginProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstitutionLogin = ({ setShowModal, showModal }: InstitutionLoginProps) => {
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <ModalDrawer hide={() => setShowModal(false)} isShowing={showModal} title="Login" footerHidden>
            <p className="mb-4">Faça login com a sua conta de instituição</p>

            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField {...field} placeholder="Email" />}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <TextField {...field} placeholder="Password" />}
                />
                <div className="flex gap-4 justify-end">
                    <Button
                        action={() => setShowModal(false)}
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
