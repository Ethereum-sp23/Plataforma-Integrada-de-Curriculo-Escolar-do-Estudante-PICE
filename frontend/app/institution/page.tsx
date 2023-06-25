"use client";
import React, { useEffect, useMemo } from "react";

import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import Card from "@/components/card";
import Badge, { BadgeType } from "@/components/badge";
import ActionItem from "@/components/actionItem";
import { toast } from "react-toastify";
import { axios } from "@/config/axios";
import { useAuth } from "@/contexts/auth";
import SeeStudent from "@/components/seeStudents";

type Student = {
    id: string;
    address: string;
    name: string;
    status: boolean;
    course: string;
};

const Institution = () => {
    

    return <SeeStudent link="/school/getStudents/" />;
};

export default Institution;
