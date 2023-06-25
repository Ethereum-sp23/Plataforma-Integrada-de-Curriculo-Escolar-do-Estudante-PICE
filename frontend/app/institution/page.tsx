"use client";
import React, { useMemo } from "react";

import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import Card from "@/components/card";
import Badge, { BadgeType } from "@/components/badge";
import ActionItem from "@/components/actionItem";

type Student = {
    wallet: string;
    name: string;
    status: boolean;
    course: string;
};

const data: Student[] = [
    {
        name: "John",
        wallet: "0x123",
        status: true,
        course: "Engenharia de Software",
    },
    {
        name: "John",
        wallet: "0x123",
        status: true,
        course: "Engenharia de Software",
    },
    {
        name: "John",
        wallet: "0x123",
        status: true,
        course: "Engenharia de Software",
    },
    {
        name: "John",
        wallet: "0x123",
        status: false,
        course: "Engenharia de Software",
    },
    {
        name: "John",
        wallet: "0x123",
        status: false,
        course: "Engenharia de Software",
    },
    {
        name: "John",
        wallet: "0x123",
        status: false,
        course: "Engenharia de Software",
    },
];

const Institution = () => {
    //should be memoized or stable
    const columns = useMemo<MRT_ColumnDef<Student>[]>(
        () => [
            {
                accessorKey: "wallet",
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
        <Card classes="min-h-[calc(100vh-4rem)] md:m-10 md:px-10 !rounded-none p-10" titleLg title="Estudantes da instituição">
            <MaterialReactTable
                columns={columns}
                data={data}
                enableRowActions
                positionActionsColumn="last"
                renderRowActionMenuItems={({ row }) => actionItems(row._valuesCache.address)}
            />
        </Card>
    );
};

export default Institution;