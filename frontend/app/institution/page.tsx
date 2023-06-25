"use client";
import React, { useEffect, useMemo } from "react";

import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import Card from "@/components/card";
import Badge, { BadgeType } from "@/components/badge";
import ActionItem from "@/components/actionItem";
import { toast } from "react-toastify";
import { axios } from "@/config/axios";
import { useAuth } from "@/contexts/auth";

type Student = {
    id: string
    address: string;
    name: string;
    status: boolean;
    course: string;
};

const Institution = () => {
    const [tableData, setTableData] = React.useState<Student[]>([]);
    
    const getTableData = async () => {
        try {
            const account = localStorage.getItem("account")
            const res = await axios.get("/school/getStudents/" + account)
            console.log(res)
        } catch (error) {
            console.log(error);
            toast.error("Erro ao carregar dados da tabela");
        }
    }

    useEffect(() => {
        getTableData();
    }, [])


    //should be memoized or stable
    const columns = useMemo<MRT_ColumnDef<Student>[]>(
        () => [
            {
                accessorKey: "address",
                header: "Carteira",
                size: 150,
            },
            {
                accessorKey: "name", //access nested data with dot notation
                header: "Nome do estudante",
                size: 150,
            },
            {
                accessorKey: "course", //normal accessorKey
                header: "Curso atual",
                size: 200,
            },
            {
                accessorKey: "status",
                header: "Status",
                size: 150,
                Cell: ({ renderedCellValue }) => (
                    <Badge type={renderedCellValue ? BadgeType.SUCCESS : BadgeType.DANGER}>
                        {renderedCellValue ? "Ativo" : "Inativo"}
                    </Badge>
                ),
            },
        ],
        []
    );



    const actionItems = (wallet: string) => {
        return [
            <ActionItem key={1} icon="visibility" label="Ver informações" link={"/student/" + wallet} />,
            <ActionItem key={2} icon="edit" label="Adicionar atividade" link={`/institution/${wallet}/edit/`} />,
        ];
    };

    return (
        <Card
            classes="min-h-[calc(100vh-4rem)] md:m-10 md:px-10 !rounded-none p-10"
            titleLg
            title="Estudantes da instituição"
        >
            {/* <MaterialReactTable
                columns={columns}
                data={data}
                enableRowActions
                positionActionsColumn="last"
                renderRowActionMenuItems={(props) => {
                    return actionItems(props.row.getValue("id"));
                }}
            /> */}
        </Card>
    );
};

export default Institution;
