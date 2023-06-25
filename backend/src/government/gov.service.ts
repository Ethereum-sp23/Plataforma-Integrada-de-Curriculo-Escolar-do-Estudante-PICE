import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { supabase } from 'src/main';
import { CreatePersonBody, CreateSchoolBody } from './dto/government.dto';
import Web3 from 'web3';
import { DappKitFunctions } from '../utils/dappKitFunctions';
import { CreateAccountResponse, Response } from './dto/government.dto';
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

    const contract = new DappKitFunctions();

    await contract.adminSendTransaction('createStudent', [account.address, '']);

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
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(
        selectError.message || deleteError.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    const contract = new DappKitFunctions();

    await contract.adminSendTransaction('deleteStudent', [data[0].address]);

    return 'Student deleted successfully!';
  }

  async getAll(): Promise<Response> {
    const { data: schools, error: schoolsError } = await supabase
      .from('gov_schools')
      .select('id, name, address, email');

    const { data: people, error: peopleError } = await supabase
      .from('gov_people')
      .select('id, name, address, email, course');

    if (schoolsError || peopleError) {
      throw new Error(schoolsError.message || peopleError.message);
    }

    if (!schools.length && !people.length) {
      throw new Error('No data found!');
    }

    if (!schools.length) {
      return {
        message: 'Everyone in your hands...',
        data: people,
      };
    }

    if (!people.length) {
      return {
        message: 'Everyone in your hands...',
        data: schools,
      };
    }

    return {
      message: 'Everyone in your hands...',
      data: [...schools, ...people],
    };
  }

  async getSchools(): Promise<Response> {
    const { data, error } = await supabase
      .from('gov_schools')
      .select('id, name, address, email');

    if (error) {
      throw new Error(error.message);
    }

    if (!data.length) {
      return { message: 'No data found!', data: null };
    }

    return {
      message: 'Everyone in your hands...',
      data,
    };
  }

  async getStudents(): Promise<Response> {
    const { data, error } = await supabase
      .from('gov_people')
      .select('id, name, address, email, course');

    if (error) {
      throw new Error(error.message);
    }

    if (!data.length) {
      return { message: 'No data found!', data: null };
    }

    return {
      message: 'Everyone in your hands...',
      data: data,
    };
  }

  async setStudent(studentId, schoolId): Promise<string | Response> {
    const { data: student, error: studentError } = await supabase
      .from('gov_people')
      .select('address')
      .eq('id', studentId);

    if (studentError) {
      throw new HttpException(studentError.message, HttpStatus.BAD_REQUEST);
    }

    const { data: school, error: schoolError } = await supabase
      .from('gov_schools')
      .select('address')
      .eq('id', schoolId);

    if (schoolError) {
      throw new HttpException(schoolError.message, HttpStatus.BAD_REQUEST);
    }

    if (!student || !school) {
      return { message: 'No data found!', data: null };
    }

    const contract = new DappKitFunctions();
    console.log('Dados chegando!!!', student[0].address, school[0].address);
    await contract.adminSendTransaction('addStudentToSchool', [
      student[0].address,
      school[0].address,
    ]);

    return "Student's school updated successfully!";
  }

  async setStudentAdmin(studentId: any, schoolIds: any) {
    for (let i = 0; i < schoolIds.length; i++) {
      await this.setStudent(studentId, schoolIds[i]);
    }

    return "Student's school updated successfully!";
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
