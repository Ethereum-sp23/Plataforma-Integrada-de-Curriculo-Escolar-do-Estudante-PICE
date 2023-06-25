"use client";
import React, { useMemo } from "react";

import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import Card from "@/components/card";
import Badge, { BadgeType } from "@/components/badge";

//example data type
type Student = {
    wallet: string;
    name: string;
    status: boolean;
    course: string;
    period: string;
};

const data: Student[] = [
    {
        name: "John",
        wallet: "0x123",
        status: true,
        course: "Engenharia de Software",
        period: "3",
    },
    {
        name: "John",
        wallet: "0x123",
        status: true,
        course: "Engenharia de Software",
        period: "3",
    },
    {
        name: "John",
        wallet: "0x123",
        status: true,
        course: "Engenharia de Software",
        period: "3",
    },
    {
        name: "John",
        wallet: "0x123",
        status: false,
        course: "Engenharia de Software",
        period: "3",
    },
    {
        name: "John",
        wallet: "0x123",
        status: false,
        course: "Engenharia de Software",
        period: "3",
    },
    {
        name: "John",
        wallet: "0x123",
        status: false,
        course: "Engenharia de Software",
        period: "3",
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
                accessorKey: "status",
                header: "Status",
                size: 150,
                Cell: ({ renderedCellValue }) => (
                    <Badge type={renderedCellValue ? BadgeType.SUCCESS : BadgeType.DANGER}>
                        {renderedCellValue ? "Ativo" : "Inativo"}
                    </Badge>
                ),
            },
            {
                accessorKey: "course", //normal accessorKey
                header: "Curso atual",
                size: 200,
            },
            {
                accessorKey: "period",
                header: "Periodo",
                size: 150,
            },
            {
                accessorKey: "wallet",
                header: "Ações",
                size: 150,
            },
        ],
        []
    );

    return (
        <Card classes="m-10 p-10" titleLg title="Estudantes da instituição">
            <MaterialReactTable columns={columns} data={data} />
        </Card>
    );
};

export default Institution;
