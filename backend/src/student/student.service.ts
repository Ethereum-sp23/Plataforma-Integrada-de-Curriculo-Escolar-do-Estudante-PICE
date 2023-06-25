import { Injectable } from '@nestjs/common';
// import abiJson from './Abi.json';
import { DappKitFunctions } from '../utils/dappKitFunctions';
import axios from 'axios';

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

  async getStudent(name): Promise<any> {
    const contract = new DappKitFunctions(
      abiJson,
      '0x0206b1DfA458EC83E5AF9D8D6AFa187599c01028',
    );

    const res = await contract.adminGetTransaction('getMessage');

    console.log(res);
  }
}
