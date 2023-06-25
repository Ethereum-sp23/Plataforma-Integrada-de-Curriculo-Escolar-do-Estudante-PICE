"use client";
import React, { useEffect } from "react";
import LandingContainer from "../landingContainer";
import Link from "next/link";
import { Button, ModalDrawer, ModalFooter } from "@taikai/rocket-kit";
import LoginModal from "../LoginModal";

const HomeSection = () => {
    const [showInstitutionModal, setInstitutionShowModal] = React.useState(false);
    const [showGovernmentModal, setGovernmentShowModal] = React.useState(false);

    return (
        <LandingContainer>
            <div className="absolute bg-white w-[2px] h-[40%] md:h-[40%] lg:h-[55%] rounded left-5 sm:left-10 top-[30%]"></div>
            <div className="absolute top-[30%] left-10 sm:left-20 flex flex-col gap-4 items-start text-white">
                <h1 className="text-7xl lg:text-9xl font-bold">PICE</h1>
                <h3 className="uppercase text-xl lg:text-2xl">
                    Plataforma integrada de currículo escolar do estudante
                </h3>
                <p className="w-[90%] sm:w-[50%] lg:w-[50%] text-sm lg:text-lg mb-2">
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

            <div className="absolute bottom-[5%] left-10 lg:left-[60%] xl:left-[75%] text-white text-2xl">
                <div className="absolute w-[150%] top-[50%] -translate-x-[-1000%] xl:translate-x-[-110%] translate-y-[-50%] bg-white h-[2px] rounded"></div>
                <p>Revolucione a</p>
                <p className="uppercase font-bold text-5xl text-primary">Educação</p>
                <p className="uppercase font-bold">Com a gente</p>
            </div>

            <div className="absolute left-[50%] translate-x-[-50%] top-6 lg:left-auto lg:translate-x-0 lg:right-6">
                <Button
                    ariaLabel="Institution Button"
                    className="button hover:scale-105 transition"
                    color="white"
                    icon="user-o"
                    iconPosition="right"
                    txtColor="white"
                    value="Entrar como instituição de ensino"
                    variant="outline"
                    action={() => setInstitutionShowModal(true)}
                />
            </div>

            <div className="absolute left-[50%] translate-x-[-50%] top-24 lg:left-auto lg:translate-x-0 lg:right-6">
                <Button
                    ariaLabel="Government Button"
                    className="button hover:scale-105 transition"
                    color="white"
                    icon="lock"
                    iconPosition="right"
                    txtColor="white"
                    value="Entrar como governo"
                    variant="outline"
                    action={() => setGovernmentShowModal(true)}
                />
            </div>

            <LoginModal
                loginEndpoint="/school/login"
                redirect="/institution"
                setShowModal={setInstitutionShowModal}
                showModal={showInstitutionModal}
            />
            <LoginModal
                redirect="/government"
                setShowModal={setGovernmentShowModal}
                showModal={showGovernmentModal}
                onlyMetamask
            />
        </LandingContainer>
    );
};

export default HomeSection;
