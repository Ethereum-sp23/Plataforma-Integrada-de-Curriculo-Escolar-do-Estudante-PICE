import { Model, Web3Connection } from '@taikai/dappkit';
import { TransactionReceipt } from '@taikai/dappkit/dist/src/interfaces/web3-core';
import standartABI from './EducationSystem.json';

export class DappKitFunctions {
  private abi: any;
  private contractAddress: string;

  constructor(
    abiJSON = standartABI,
    contractAddress = process.env.CONTRACT_ADDRESS,
  ) {
    this.abi = abiJSON.abi;
    this.contractAddress = contractAddress;
  }

  private async executeTransaction(
    privateKey: string | undefined,
    methodName: string,
    params?: any,
    isSendTx = true,
  ): Promise<any> {
    const web3Connection = new Web3Connection({
      web3Host: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      privateKey,
    });

    web3Connection.start();

    const model = new Model(web3Connection, this.abi, this.contractAddress);

    const tx = isSendTx
      ? await model.sendTx(
          params
            ? model.contract.methods[methodName](...params)
            : model.contract.methods[methodName](),
        )
      : await model.callTx(
          params
            ? model.contract.methods[methodName](...params)
            : model.contract.methods[methodName](),
        );

    return tx;
  }

  async adminSendTransaction(
    methodName: string,
    params?: any,
  ): Promise<TransactionReceipt<any>> {
    return this.executeTransaction(
      process.env.GOV_PRIVATE_KEY,
      methodName,
      params,
    );
  }

  async adminGetTransaction(methodName: string, params?: any): Promise<any> {
    return this.executeTransaction(
      process.env.GOV_PRIVATE_KEY,
      methodName,
      params,
      false,
    );
  }

  async userSendTransaction(
    privateKey: string,
    methodName: string,
    params?: any,
  ): Promise<TransactionReceipt<any>> {
    return this.executeTransaction(privateKey, methodName, params);
  }

  async userGetTransaction(
    privateKey: string,
    methodName: string,
    params?: any,
  ): Promise<any> {
    return this.executeTransaction(privateKey, methodName, params, false);
  }
}
