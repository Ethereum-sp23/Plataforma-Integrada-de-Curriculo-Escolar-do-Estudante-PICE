"use client";
import { Web3Connection } from "@taikai/dappkit";
import React, { createContext, useState, useContext, SetStateAction } from "react";
import { toast } from "react-toastify";
import { Web3 } from "web3";

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

    const changeNetwork = async () => {
        const provider = (window as any).ethereum;
        const chainId = 11155111;
        console.log(provider.networkVersion);
        if (provider.networkVersion != chainId) {
            await provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(chainId) }],
            });
        }
    };

    const connectMetamask = async () => {
        if ((window as any).ethereum) {
            try {
                await changeNetwork();
                const provider = (window as any).ethereum;

                const web3Connection = new Web3Connection({
                    web3CustomProvider: provider,
                    debug: true,
                });

                await web3Connection.connect();
                const addrs = await web3Connection.getAddress();
                setAccount(addrs);
                return addrs;
                console.log("Metamask conectada com sucesso! Wallet address: ", account);
            } catch (error) {
                toast.error("Erro ao conectar com a Metamask");
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
