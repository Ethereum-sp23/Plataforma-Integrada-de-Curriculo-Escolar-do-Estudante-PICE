"use client";
import Card from "@/components/card";
import CreateInstitution from "@/components/createInstitution";
import CreateStudent from "@/components/createStudent";
import SeeSchools from "@/components/seeSchools";
import SeeStudent from "@/components/seeStudents";
import React from "react";

const GovernmentDashboard = () => {
    return (
        <>
            <div className="flex flex-col gap-6 m-6">
                <SeeStudent link="/government/allStudents" noActions />
                <SeeSchools />
            </div>
            <div className="flex gap-6 m-6 mb-0 pb-6">
                <CreateStudent />
                <CreateInstitution />
            </div>
        </>
    );
};

export default GovernmentDashboard;
