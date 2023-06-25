import { Injectable } from '@nestjs/common';
import { supabase } from 'src/main';
import { Web3Connection, Model, Web3Contract, Web3ContractOptions, ContractCallMethod } from '@taikai/dappkit';
import abiJson from "./Abi.json"

@Injectable()
export class StudentService {

  async getAllNfts({address}): Promise<any> {

    const {abi} = JSON.parse(JSON.stringify(abiJson));

    const web3Connection = new Web3Connection({ 
      web3Host: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      privateKey: process.env.GOV_PRIVATE_KEY,
     });

    web3Connection.start();

    const model = new Model(web3Connection, abi, '0x0206b1DfA458EC83E5AF9D8D6AFa187599c01028');

    const tx = await model.sendTx(model.contract.methods.testPayable("test"));

    console.log(tx);
}
}
 