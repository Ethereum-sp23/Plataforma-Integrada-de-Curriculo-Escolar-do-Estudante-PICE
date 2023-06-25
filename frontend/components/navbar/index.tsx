"use client";
import Image from "next/image";
import React from "react";
// import Logo from "@/assets/logoText.png";
import Link from "next/link";
import { Icon } from "@taikai/rocket-kit";

const Navbar = () => {
    return (
        <div className="border-b-2 sm:border-b-0 h-16 bg-white px-10 flex items-center">
            <Image src={"/logoText.png"} width={64} height={32} alt="Logo" />
            <Link href={"/"} className="ml-auto hover:scale-105 transition-all flex gap-4">
                Logout
                <Icon icon="signout" className="w-6 h-6" fill="black" />
            </Link>
        </div>
    );
};

export default Navbar;
