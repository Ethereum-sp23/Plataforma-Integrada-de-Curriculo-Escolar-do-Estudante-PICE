/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import abiJson from './Abi.json';
import { DappKitFunctions } from '../utils/dappKitFunctions';
import axios from 'axios';
import { supabase } from 'src/main';
import { ResponseGetStudents } from './dto/student.dto';

@Injectable()
export class StudentService {
  async getAllNfts({ id }): Promise<any> {
    // pegar o array de todos os IDs dos NFTs de um usuario com base no endereço do usuario
    const contract = new DappKitFunctions();

    const { data, error } = await supabase
      .from('gov_people')
      .select('*')
      .eq('id', id);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    console.log(
      'fazendo transação para pegar todos os IDs dos NFTs do usuario ',
      data[0].address,
    );

    const allIDs = await contract.userGetTransaction(
      data[0].private_key,
      'seeOwnedNFTs',
      [data[0].address],
    );
    console.log('IDS: ', allIDs);

    const allIPFSLinks = [];
    for (const item of allIDs) {
      // para cada ID, pegar o link do IPFS
      console.log('adicionando o link do IPFS do NFT de ID ', item);

      const retrievedIPFSLink = await contract.userGetTransaction(
        data[0].private_key,
        'getIPFSByID',
        [item],
      );

      allIPFSLinks.push(retrievedIPFSLink);
    }

    const allNftsResponse = [];

    for (const link of allIPFSLinks) {
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
      .ilike('name', `%${name}%`);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    if (data.length === 0) {
      return 'No student found with this name!';
    }

    const students = [];

    for (const person of data) {
      const student = {
        id: person.id,
        name: person.name,
        address: person.address,
        email: person.email,
        course: person.course,
      };
      students.push(student);
    }

    return { data: students };
  }

  async getStudentById(id: string) {
    const { error, data } = await supabase
      .from('gov_people')
      .select('*')
      .eq('id', id);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    if (data.length === 0) {
      return 'No student found with this id!';
    }

    const student = {
      id: data[0].id,
      name: data[0].name,
      address: data[0].address,
      email: data[0].email,
      course: data[0].course,
    };

    return { data: student };
  }
}
