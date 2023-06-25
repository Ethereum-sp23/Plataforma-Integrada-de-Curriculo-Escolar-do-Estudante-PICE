"use client";
import Image from "next/image";
import React from "react";
import StudentImage from "@/assets/student.jpg";
import { AvatarImage, Icon, Spinner } from "@taikai/rocket-kit";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface StudentHeaderProps {
    student: any;
    loading: boolean;
}

const StudentHeader = ({ student, loading }: StudentHeaderProps) => {
    const router = useRouter();

    return (
        <div className="bg-white flex flex-col items-center pt-12 pb-6 relative">
            <div
                className="absolute left-4 top-4 w-8 h-8 cursor-pointer hover:scale-105 transition-all"
                onClick={() => router.back()}
            >
                <Icon icon="caret-left" fill="black" />
            </div>
            <div className="rounded-full shadow mb-2">
                <AvatarImage alt="Person" boring boringType="pixel" size={100} url="" />
            </div>
            {loading ? (
                <Spinner fill="#939393" size="20px" className="my-6" />
            ) : (
                <>
                    <h1 className="text-xl font-bold text-center">{student.name}</h1>
                    <h3 className="text-md font-light mb-2 text-gray-400">{student.email}</h3>
                    <h3 className="text-md font-light">{student.course}</h3>
                </>
            )}
        </div>
    );
};

export default StudentHeader;
