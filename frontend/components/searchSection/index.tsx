"use client";
import { DataWarning, LoadingState, TextField } from "@taikai/rocket-kit";
import React, { useEffect } from "react";
import TaikaiCard from "../taikaiCard";

const SearchSection = () => {
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState<{ login: string }[]>([]);

    useEffect(() => {
        if (search.length === 0) {
            setLoading(false);
            return setData([]);
        }
        setLoading(true);
        const delayDebounceFn = setTimeout(() => {
            fetch(`https://api.github.com/search/users?q=${search}`)
                .then((res) => res.json())
                .then((res) => {
                    if (res.items) {
                        setData(res.items);
                    }
                    setLoading(false);
                });
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const dataMemo = React.useMemo(
        () =>
            data.length > 0
                ? data.map((item) => {
                      return {
                          id: 1,
                          title: item.login,
                      };
                  })
                : [],
        [data]
    );

    return (
        <div className="min-h-[100vh] py-32" id="searchSection">
            <div className="mx-auto w-[70%]">
                <h3 className="text-center text-4xl mb-10">Procure por um estudante</h3>
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-4 w-full mb-8 outline-none focus:border-b-primary focus:border-b-4 transition-all"
                    placeholder="Nome do estudante..."
                />
                {loading && <LoadingState cardsNumber={6} center type="card" />}
                {!loading && data.length === 0 && (
                    <DataWarning type="data">
                        <span>Faça uma pesquisa para obter informações...</span>
                    </DataWarning>
                )}
                {dataMemo.length > 0 && (
                    <div className="grid grid-cols-3 gap-10">
                        {dataMemo.map((item, index) => (
                            <TaikaiCard {...item} key={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchSection;
