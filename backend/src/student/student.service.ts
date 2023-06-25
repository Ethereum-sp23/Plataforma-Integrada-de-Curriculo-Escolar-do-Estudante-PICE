import { Injectable } from '@nestjs/common';
// import abiJson from './Abi.json';
import { DappKitFunctions } from '../utils/dappKitFunctions';
import axios from 'axios';
import { supabase } from 'src/main';

interface ResponseGetStudents {
  data: any[];
}
@Injectable()
export class StudentService {
  async getAllNfts({ address }): Promise<any> {

    // pegar o array de todos os IDs dos NFTs de um usuario com base no endereço do usuario
    console.log("conectando ao contrato no endereço", contractAddress)
    const contract = new DappKitFunctions("abi???",'address???',);

    console.log("fazendo transação para pegar todos os IDs dos NFTs do usuario ", address)
    const allIDs = await contract.adminGetTransaction("seeOwnedNFTs", [address])
    console.log("IDS: ", allIDs)

    const allIPFSLinks = []
    for (let item in allIDs) {
      // para cada ID, pegar o link do IPFS
      console.log("adicionando o link do IPFS do NFT de ID ", item)
      const retrievedIPFSLink = await contract.adminGetTransaction('getIPFSByID', [item]);

      allIPFSLinks.push(retrievedIPFSLink);

    }

    let allNftsResponse = []

    for (let link in allIPFSLinks) {
      console.log("pegando dados do link ", link)
      const res = await axios.get(link);
      allNftsResponse.push(res.data);
    }

    return allNftsResponse;

  }

  async getStudentByName(name: string): Promise<string | ResponseGetStudents> {
    const { error, data } = await supabase
      .from('gov_people')
      .select('*')
      .ilike('name', name);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      return 'No student found with this name!';
    }

    let students = [];

    for (const person of data) {
      let student = {
        name: person.name,
        address: person.address,
      };
      students.push(student);
    }

    return { data: students };
  }
}
