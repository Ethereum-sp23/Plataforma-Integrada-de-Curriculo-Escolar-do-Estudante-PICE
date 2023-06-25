"use client";
import { Web3Connection } from "@taikai/dappkit/dist/src/base/web3-connection";
import React, { createContext, useState, useContext, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { Web3 } from "web3";

interface AuthContextInterface {
    account: string | null;
    setAccount(account: string | null): void;
    loading: boolean;
    setLoading(loading: boolean): void;
    connectMetamask: () => Promise<string | undefined>;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export default function AuthProvider({ children }: any) {
    const [account, setAccount] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!account) {
            setAccount(localStorage.getItem("account"));
        }
    }, []);

    const changeNetwork = async () => {
        const provider = (window as any).ethereum;
        const chainId = 11155111;

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
                localStorage.setItem("account", addrs);

                console.log("Metamask conectada com sucesso! Wallet address: ", account);
                return addrs;
            } catch (error) {
                toast.error("Erro ao conectar com a Metamask");
                console.error(error);
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                account,
                setAccount,
                loading,
                setLoading,
                connectMetamask,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    const { account, setAccount, loading, setLoading, connectMetamask } = context;
    return {
        account,
        setAccount,
        loading,
        setLoading,
        connectMetamask,
    };
}
