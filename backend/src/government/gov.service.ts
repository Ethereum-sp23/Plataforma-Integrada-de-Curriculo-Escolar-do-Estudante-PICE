import { Injectable } from '@nestjs/common';
import { supabase } from 'src/main';
import { CreatePersonBody, CreateSchoolBody } from './gov.controller';
import Web3 from 'web3';

interface CreateAccountResponse {
  address: string;
  privateKey: string;
  signTransaction: Function;
  sign: Function;
  encrypt: Function;
}

@Injectable()
export class GovernmentService {
  async getNameByAddress(params): Promise<String> {
    const { error, data } = await supabase
      .from('gov_people')
      .select('*')
      .eq('address', params.address);
    return data[0].name;
  }

  async createPerson(body: CreatePersonBody): Promise<string> {
    const web3: Web3 = new Web3(
      `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}}`,
    );
    const account: CreateAccountResponse = web3.eth.accounts.create();

    const { error } = await supabase.from('gov_people').insert([
      {
        name: body.name,
        email: body.email,
        course: body.course,
        address: account.address,
        private_key: account.privateKey,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return 'Person created successfully!';
  }

  async createSchool(body: CreateSchoolBody): Promise<string> {
    const web3: Web3 = new Web3(
      `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}}`,
    );
    const account: CreateAccountResponse = web3.eth.accounts.create();

    const { error } = await supabase.from('gov_schools').insert([
      {
        name: body.name,
        email: body.email,
        password: body.password,
        address: account.address,
        private_key: account.privateKey,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return 'School created successfully!';
  }
}
