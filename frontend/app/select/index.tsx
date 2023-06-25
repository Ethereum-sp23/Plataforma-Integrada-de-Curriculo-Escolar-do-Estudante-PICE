import React from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";

interface Props extends React.ComponentProps<typeof Select>{
    label?: string;
    options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
    addIcon?: React.ReactNode;
}

const SelectComponent: React.FC<Props> = ({
    label,
    options,
    addIcon,
    ...rest
}) => {
    return (
        <div className="w-full">
            {label && <label className="mb-1 block text-lg">{label}</label>}
            <div className="flex gap-4 items-center ">
                <Select
                    {...rest}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: "#ccc",
                            primary50: "#f3f3f3",
                            primary75: "#f3f3f3",
                            primary25: "#f3f3f3",
                        },
                    })}
                    classNames={{
                        control: (state) => "p-2 w-80",
                    }}
                    options={options}
                />
                {addIcon}
            </div>
        </div>
    );
};

export default SelectComponent;