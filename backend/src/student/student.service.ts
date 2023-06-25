import { Injectable } from '@nestjs/common';
import { supabase } from 'src/main';
import {
  Web3Connection,
  Model,
  Web3Contract,
  Web3ContractOptions,
  ContractCallMethod,
} from '@taikai/dappkit';
import abiJson from './Abi.json';
import { DappKitFunctions } from '../utils/dappKitFunctions';

@Injectable()
export class StudentService {
  async getAllNfts({ address }): Promise<any> {
    const contract = new DappKitFunctions(
      abiJson,
      '0x0206b1DfA458EC83E5AF9D8D6AFa187599c01028',
    );

    const res = await contract.adminGetTransaction('getMessage');

    console.log(res);
  }
}
