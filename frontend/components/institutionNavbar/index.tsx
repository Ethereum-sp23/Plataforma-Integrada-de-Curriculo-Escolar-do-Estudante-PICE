'use client'
import Image from "next/image";
import React from "react";
import Logo from "@/assets/logoText.png";
import Link from "next/link";

const InstitutionNavbar = () => {
    return (
        <div className="h-16 bg-white px-10 flex items-center">
            <Image src={Logo} height={32} alt="Logo" />
            <Link href={"/"} className="ml-auto hover:scale-105 transition-all">
                Logout
            </Link>
        </div>
    );
};

export default InstitutionNavbar;
