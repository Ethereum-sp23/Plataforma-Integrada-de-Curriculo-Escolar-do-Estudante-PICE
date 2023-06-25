import CurriculumImage1 from "@/assets/curriculumItem1.png";
import CurriculumImage2 from "@/assets/curriculumItem2.png";
import { StudentInfoItemProps } from "@/components/studentInfoItem";
import { CurriculumItemProps } from "@/components/curriculumItem";

export const curriculumItems: CurriculumItemProps[] = [
    {
        image: CurriculumImage1,
        title: "Engenharia da computação",
        subtitle: "Universidade de São Paulo",
    },
    {
        image: CurriculumImage2,
        title: "Ensino médio",
        subtitle: "Colégio Loyola",
    },
    {
        image: CurriculumImage2,
        title: "Ensino fundamental",
        subtitle: "Colégio Loyola",
    },
];

export const studentInfoItems: StudentInfoItemProps[] = [
    {
        label: "Nível de ensino atual",
        value: "Graduação",
    },
    {
        label: "Curso atual",
        value: "Engenharia da computação",
    },
    {
        label: "Instituição atual",
        value: "Universidade de São Paulo",
    },
    {
        label: "Período de estudos",
        value: "Integral",
    },
    {
        label: "Medalhas",
        value: "447",
    },
    {
        label: "Atividades extracurriculares",
        value: "29",
    },
];
