import { Injectable } from '@nestjs/common';
import { supabase } from 'src/main';
import { CreatePersonBody, CreateSchoolBody } from './dto/government.dto';
import Web3 from 'web3';
import { DappKitFunctions } from '../utils/dappKitFunctions';
import { CreateAccountResponse } from './dto/government.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class GovernmentService {
  async getNameByAddress(params): Promise<string> {
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

    const contract = new DappKitFunctions();

    await contract.adminSendTransaction('createSchool', [
      account.address.toString(),
    ]);
    const hashedPassword = await bcrypt.hash(body.password, 8);
    const { error } = await supabase.from('gov_schools').insert([
      {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        address: account.address,
        private_key: account.privateKey,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return 'School created successfully!';
  }

  async deleteStudent(email: string): Promise<string> {
    const { data, error: selectError } = await supabase
      .from('gov_people')
      .select('*')
      .eq('email', email);

    const { error: deleteError } = await supabase
      .from('gov_people')
      .delete()
      .eq('email', email);

    if (selectError || deleteError) {
      throw new Error(selectError.message || deleteError.message);
    }

    const contract = new DappKitFunctions();

    await contract.adminSendTransaction('deleteStudent', [data[0].address]);

    return 'Student deleted successfully!';
  }

  // async deleteSchool(email: string): Promise<string> {
  //   const { data, error: selectError } = await supabase
  //     .from('gov_schools')
  //     .select('*')
  //     .eq('email', email);

  //   const { error: deleteError } = await supabase
  //     .from('gov_schools')
  //     .delete()
  //     .eq('email', email);

  //   if (selectError || deleteError) {
  //     throw new Error(selectError.message || deleteError.message);
  //   }

  //   const contract = new DappKitFunctions();

  //   await contract.adminSendTransaction('deleteSchool', [data[0].address]);

  //   return 'School deleted successfully!';
  // }
}
