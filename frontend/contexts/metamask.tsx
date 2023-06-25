'use client'
import { Web3Connection } from "@taikai/dappkit";
import React, { createContext, useState, useContext, SetStateAction } from "react";

interface MetamaskContextInterface {
    account: string | null;
    setAccount(account: string | null): void;
    loading: boolean;
    setLoading(loading: boolean): void;
    connectMetamask: () => Promise<void>;
}

const MetamaskContext = createContext<MetamaskContextInterface | null>(null);

export default function MetamaskProvider({ children }: any) {
    const [account, setAccount] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const connectMetamask = async () => {
        if ((window as any).ethereum) {
            try {
                const provider = (window as any).ethereum;
                const web3Connection = new Web3Connection({
                    web3CustomProvider: provider,
                    debug: true,
                });

                await web3Connection.connect();
                setAccount(await web3Connection.getAddress());
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <MetamaskContext.Provider
            value={{
                account,
                setAccount,
                loading,
                setLoading,
                connectMetamask,
            }}
        >
            {children}
        </MetamaskContext.Provider>
    );
}

export function useMetamask() {
    const context = useContext(MetamaskContext);
    if (!context) throw new Error("useMetamask must be used within a MetamaskProvider");
    const { account, setAccount, loading, setLoading, connectMetamask } = context;
    return {
        account,
        setAccount,
        loading,
        setLoading,
        connectMetamask,
    };
}
