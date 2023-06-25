"use client";
import React, { useEffect, useMemo } from "react";

import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import Card from "@/components/card";
import { toast } from "react-toastify";
import { axios } from "@/config/axios";

type Student = {
    id: string;
    address: string;
    name: string;
    email: string;
};

const SeeSchools = () => {
    const [tableData, setTableData] = React.useState<Student[]>([]);

    const getTableData = async () => {
        try {
            const res = await axios.get('/government/allSchools');
            console.log(res);
            setTableData(res.data.data)
        } catch (error) {
            console.log(error);
            toast.error("Erro ao carregar dados da tabela");
        }
    };

    useEffect(() => {
        getTableData();
    }, []);

    //should be memoized or stable
    const columns = useMemo<MRT_ColumnDef<Student>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Nome",
                size: 150,
            },
            {
                accessorKey: "email", //access nested data with dot notation
                header: "Email",
                size: 150,
            },
            {
                accessorKey: "address", //normal accessorKey
                header: "Carteira",
                size: 200,
            },
        ],
        []
    );

    return (
        <Card
            classes="min-h-[calc(100vh-4rem)] md:px-10 !rounded-none p-10"
            titleLg
            title="Instituições"
        >
            <MaterialReactTable
                columns={columns}
                data={tableData}
                positionActionsColumn="last"
            />
        </Card>
    );
};

export default SeeSchools;
