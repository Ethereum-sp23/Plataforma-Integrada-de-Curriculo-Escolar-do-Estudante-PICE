import { Model, Web3Connection } from "@taikai/dappkit";
import { TransactionReceipt } from "@taikai/dappkit/dist/src/interfaces/web3-core";
import standartABI from "./EducationSystem.json";



export class DappKitFunctions {
    private abi: any;
    private contractAddress: string;

    constructor(abiJSON = standartABI, contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ) {
        this.abi = abiJSON.abi;
        this.contractAddress = contractAddress as string;
    }

    private async executeTransaction(methodName: string, params?: any, isSendTx = true): Promise<any> {
        const web3Connection = new Web3Connection({
            web3CustomProvider: (window as any).ethereum,
        });

        web3Connection.start();
        await web3Connection.connect();

        const model = new Model(web3Connection, this.abi, this.contractAddress);

        const tx = isSendTx
            ? await model.sendTx(
                  params ? model.contract.methods[methodName](...params) : model.contract.methods[methodName]()
              )
            : await model.callTx(
                  params ? model.contract.methods[methodName](...params) : model.contract.methods[methodName]()
              );

        return tx;
    }

    async userSendTransaction(methodName: string, params?: any): Promise<TransactionReceipt<any>> {
        return this.executeTransaction(methodName, params);
    }

    async userGetTransaction(methodName: string, params?: any): Promise<any> {
        return this.executeTransaction(methodName, params, false);
    }
}
