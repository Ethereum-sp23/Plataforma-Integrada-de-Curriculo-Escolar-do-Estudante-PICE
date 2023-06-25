import { Injectable } from '@nestjs/common';
import abiJson from './Abi.json';
import { DappKitFunctions } from '../utils/dappKitFunctions';
import { supabase } from 'src/main';

interface ResponseGetStudents {
  data: any[];
}
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
