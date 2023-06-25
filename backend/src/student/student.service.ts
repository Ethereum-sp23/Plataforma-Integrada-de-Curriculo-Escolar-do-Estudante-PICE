import { Injectable } from '@nestjs/common';
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

  async getStudent(name): Promise<any> {
    const contract = new DappKitFunctions(
      abiJson,
      '0x0206b1DfA458EC83E5AF9D8D6AFa187599c01028',
    );

    const res = await contract.adminGetTransaction('getMessage');

    console.log(res);
  }
}
