"use client";
import Image from "next/image";
import React from "react";
import StudentImage from "@/assets/student.jpg";
import { AvatarImage, Icon } from "@taikai/rocket-kit";
import Link from "next/link";
import { useRouter } from "next/navigation";

const StudentHeader = () => {
    const router = useRouter();

    return (
        <div className="bg-white flex flex-col items-center pt-12 pb-6 relative">
            <div className="absolute left-4 top-4 w-8 h-8" onClick={() => router.back()}>
                <Icon icon="caret-left" fill="black" />
            </div>
            <div className="rounded-full shadow mb-2">
                <AvatarImage alt="Person" boring boringType="pixel" size={100} url="" />
            </div>
            <h1 className="text-xl font-bold text-center">Lia walkins</h1>
            <h3 className="text-sm font-light mb-4 text-gray-400">São Paulo, Brasil</h3>
            <h3 className="text-md font-light">Student</h3>
        </div>
    );
};

export default StudentHeader;
