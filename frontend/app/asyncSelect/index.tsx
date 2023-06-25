/* eslint-disable react-hooks/exhaustive-deps */
import { axios } from "@/config/axios";
import React, { useEffect, useState } from "react";
import Async from "react-select/async";
import Select from "react-select";
import { Controller } from "react-hook-form";

interface Props extends React.ComponentProps<typeof Select> {
    label?: string;
    link: string;
    addIcon?: React.ReactNode;
    reload?: boolean;
    control: any;
    name: string;
    error?: string;
}

export default function AsyncSelect({ label, addIcon, link, reload, control, name, error, ...rest }: Props) {
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const mapResponseToValuesAndLabels: any = (data: any) => ({
        value: data.id,
        label: data.name,
    });

    async function callApi(value: any, callback: any) {
        const { data } = await axios.get(link);
        const mappedData = data.data.map(mapResponseToValuesAndLabels);
        const filteredData = mappedData.filter((i: any) => i.label.toLowerCase().includes(value.toLowerCase()));
        return filteredData;
    }

    useEffect(() => {
        setReloadTrigger(reloadTrigger + 1);
    }, [reload]);

    return (
        <div className="w-full">
            {label && <label className="mb-1 block text-lg">{label}</label>}
            <div className="flex gap-4 items-center ">
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <Async
                            {...rest}
                            key={reloadTrigger}
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
                            onChange={(value: any) => {
                                field.onChange(value);
                            }}
                            onBlur={() => field.onBlur()}
                            loadOptions={callApi}
                            defaultOptions
                        />
                    )}
                />

                {addIcon}
            </div>
            {error && <span className="text-red-800 mt-1 block">{error}</span>}
        </div>
    );
}