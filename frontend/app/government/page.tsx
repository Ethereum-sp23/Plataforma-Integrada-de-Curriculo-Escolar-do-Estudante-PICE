"use client";
import Card from "@/components/card";
import CreateInstitution from "@/components/createInstitution";
import CreateStudent from "@/components/createStudent";
import React, { useState } from "react";

const GovernmentDashboard = () => {
    return (
        <div className="flex gap-6 m-6">
            <CreateStudent />
            <CreateInstitution />
        </div>
    );
};

export default GovernmentDashboard;
