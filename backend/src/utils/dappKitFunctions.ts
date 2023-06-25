import { Model, Web3Connection } from '@taikai/dappkit';
import { TransactionReceipt } from '@taikai/dappkit/dist/src/interfaces/web3-core';
import standartABI from './EducationSystem.json';

export class DappKitFunctions {
  private abi: any;
  private contractAddress: string;

  constructor(abiJSON?: any, contractAddress?: string) {
    const { abi } = JSON.parse(JSON.stringify(abiJSON));
    this.abi = abiJSON ? abi : standartABI.abi;
    this.contractAddress = contractAddress
      ? contractAddress
      : process.env.CONTRACT_ADDRESS;
  }

  async adminSendTransaction(
    methodName: string,
    params?: any,
  ): Promise<TransactionReceipt<any>> {
    const web3Connection = new Web3Connection({
      web3Host: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      privateKey: process.env.GOV_PRIVATE_KEY,
    });

    web3Connection.start();

    const model = new Model(web3Connection, this.abi, this.contractAddress);

    const tx = await model.sendTx(
      params
        ? model.contract.methods[methodName](...params)
        : model.contract.methods[methodName](),
    );

    return tx;
  }

  async adminGetTransaction(methodName: string, params?: any): Promise<any> {
    const web3Connection = new Web3Connection({
      web3Host: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      privateKey: process.env.GOV_PRIVATE_KEY,
    });

    web3Connection.start();

    const model = new Model(web3Connection, this.abi, this.contractAddress);

    const tx = await model.callTx(
      params
        ? model.contract.methods[methodName](...params)
        : model.contract.methods[methodName](),
    );

    return tx;
  }

  async userSendTransaction(
    privateKey: string,
    methodName: string,
    params?: any,
  ): Promise<TransactionReceipt<any>> {
    const web3Connection = new Web3Connection({
      web3Host: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      privateKey: privateKey,
    });

    web3Connection.start();

    const model = new Model(web3Connection, this.abi, this.contractAddress);

    const tx = await model.sendTx(
      params
        ? model.contract.methods[methodName](...params)
        : model.contract.methods[methodName](),
    );

    return tx;
  }

  async userGetTransaction(
    privateKey: string,
    methodName: string,
    params?: any,
  ): Promise<any> {
    const web3Connection = new Web3Connection({
      web3Host: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      privateKey: privateKey,
    });

    web3Connection.start();

    const model = new Model(web3Connection, this.abi, this.contractAddress);

    const tx = await model.callTx(
      params
        ? model.contract.methods[methodName](...params)
        : model.contract.methods[methodName](),
    );

    return tx;
  }
}
