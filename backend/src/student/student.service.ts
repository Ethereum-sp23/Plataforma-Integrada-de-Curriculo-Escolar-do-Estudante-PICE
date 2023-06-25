import { Injectable } from '@nestjs/common';
// import abiJson from './Abi.json';
import { DappKitFunctions } from '../utils/dappKitFunctions';
import axios from 'axios';
import { supabase } from 'src/main';
import { ResponseGetStudents } from './dto/student.dto';

@Injectable()
export class StudentService {
  async getAllNfts({ address }): Promise<any> {
    // pegar o array de todos os IDs dos NFTs de um usuario com base no endereço do usuario
    const contract = new DappKitFunctions();

    console.log(
      'fazendo transação para pegar todos os IDs dos NFTs do usuario ',
      address,
    );
    const allIDs = await contract.adminGetTransaction('seeOwnedNFTs', [
      address,
    ]);
    console.log('IDS: ', allIDs);

    const allIPFSLinks = [];
    for (const item in allIDs) {
      // para cada ID, pegar o link do IPFS
      console.log('adicionando o link do IPFS do NFT de ID ', item);
      const retrievedIPFSLink = await contract.adminGetTransaction(
        'getIPFSByID',
        [item],
      );

      allIPFSLinks.push(retrievedIPFSLink);
    }

    const allNftsResponse = [];

    for (const link in allIPFSLinks) {
      console.log('pegando dados do link ', link);
      const res = await axios.get(link);
      allNftsResponse.push(res.data);
    }

    return allNftsResponse;
  }

  async getStudentByName(name: string): Promise<string | ResponseGetStudents> {
    const { error, data } = await supabase
      .from('gov_people')
      .select('*')
      .textSearch('name', `'${name}'`);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      return 'No student found with this name!';
    }

    const students = [];

    for (const person of data) {
      const student = {
        name: person.name,
        address: person.address,
      };
      students.push(student);
    }

    return { data: students };
  }
}
