"use client";
import React, { useEffect } from "react";
import LandingContainer from "../landingContainer";
import Link from "next/link";
import { Button, ModalDrawer, ModalFooter } from "@taikai/rocket-kit";
import { useMetamask } from "@/contexts/metamask";
import { useRouter } from "next/navigation";
import InstitutionLogin from "../institutionLogin";

const HomeSection = () => {
    const { connectMetamask } = useMetamask();
    const router = useRouter();
    const [showModal, setShowModal] = React.useState(false);

    return (
        <LandingContainer>
            <div className="absolute bg-white w-1 h-[55%] rounded left-10 top-[30%]"></div>
            <div className="absolute top-[30%] left-20 flex flex-col gap-4 items-start text-white">
                <h3 className="text-lg">Plataforma integrada de currículo escolar do estudante</h3>
                <h1 className="text-9xl font-bold">PICE</h1>
                <h3 className="uppercase text-2xl">Conectando alunos e instituições</h3>
                <p className="w-[50%] text-lg mb-2">
                    A PICE é uma plataforma de registro acadêmico baseada em blockchain que capacita os estudantes,
                    permitindo que eles destaquem suas conquistas de forma tangível em candidaturas e contribuindo para
                    uma educação de qualidade.
                </p>
                <Link
                    scroll={false}
                    href={"#searchSection"}
                    className="text-white border text-md inline-block py-4 px-8 rounded hover:scale-105 transition"
                >
                    Procure por um estudante
                </Link>
            </div>

            <div className="absolute bottom-[5%] left-[75%] text-white text-2xl">
                <div className="absolute w-[150%] top-[50%] translate-x-[-110%] translate-y-[-50%] bg-white h-1 rounded"></div>
                <p>Revolucione a</p>
                <p className="uppercase font-bold text-5xl text-primary">Educação</p>
                <p className="uppercase font-bold">Com a gente</p>
            </div>

            <div className="absolute top-6 right-6">
                <Button
                    ariaLabel="Institution Button"
                    className="button hover:scale-105 transition"
                    color="white"
                    icon="user-o"
                    iconPosition="right"
                    txtColor="white"
                    value="Entrar como instituição de ensino"
                    variant="outline"
                    action={() => setShowModal(true)}
                />
            </div>

            <InstitutionLogin setShowModal={setShowModal} showModal={showModal} />
        </LandingContainer>
    );
};

export default HomeSection;
