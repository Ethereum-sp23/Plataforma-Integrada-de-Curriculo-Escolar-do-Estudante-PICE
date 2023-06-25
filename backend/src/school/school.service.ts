import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { supabase } from 'src/main';
import { DappKitFunctions } from 'src/utils/dappKitFunctions';
import PinataClient from '@pinata/sdk';
import bcrypt from 'bcryptjs';
import { CreateAccountResponse, LoginBodyDto } from './dto/school.dto';
import { Response, CreatePersonBody } from './dto/school.dto';
import axios from 'axios';
import Web3 from 'web3';
// interface CreateNFTBody {}
@Injectable()
export class SchoolService {
  private pinata: PinataClient;

  constructor() {
    this.pinata = new PinataClient(
      process.env.PINATA_API_KEY,
      process.env.PINATA_SECRET_KEY,
    );
  }

  async mintNFT({ metadata, studentId, schoolAuth }, file): Promise<string> {
    let desiredAuthMethod = 'address';
    if (!schoolAuth.startsWith('0x')) {
      desiredAuthMethod = 'email';
    } else {
      desiredAuthMethod = 'address';
    }

    console.log('----------', desiredAuthMethod);
    const { data, error } = await supabase
      .from('gov_schools')
      .select('*')
      .ilike(desiredAuthMethod, schoolAuth);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    const { data: studentData, error: studentError } = await supabase
      .from('gov_people')
      .select('address')
      .eq('id', studentId);

    if (studentError) {
      throw new HttpException(studentError.message, HttpStatus.BAD_REQUEST);
    }
    //--------------------------------------------------------------------------------------

    if (!file) {
      throw new HttpException(
        'Please select an image to upload',
        HttpStatus.BAD_REQUEST,
      );
    }

    const imageFormData = new FormData();
    imageFormData.append('file', file);

    const imageUploadingResponse = await this.pinata.pinFileToIPFS(file, {
      pinataMetadata: {
        name: 'CIDE record',
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });

    const uploadedImageLink = `https://ipfs.io/ipfs/${imageUploadingResponse.IpfsHash}`;

    //--------------------------------------------------------------------------------------

    const IPFSJson = {
      image: uploadedImageLink,
      metadata: metadata,
    };

    const NFTuploadingResponse = await this.pinata.pinJSONToIPFS(IPFSJson);

    const finalIPFSLink = `https://ipfs.io/ipfs/${NFTuploadingResponse.IpfsHash}`;

    const contract = new DappKitFunctions();

    console.log(data[0].private_key);
    await contract.userSendTransaction(data[0].private_key, 'issueNFT', [
      studentData[0].address,
      finalIPFSLink,
    ]);

    return 'NFT created successfully!';
  }

  async getSchoolNFTs(address: string): Promise<string> {
    const { data, error } = await supabase
      .from('gov_schools')
      .select('*')
      .eq('address', address);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    const contract = new DappKitFunctions();
    const res = await contract.adminGetTransaction('getSchoolNFTs', [address]);

    for (const NFTid in res) {
    }

    return res;
  }

  async login(body: LoginBodyDto): Promise<string> {
    const { data, error } = await supabase
      .from('gov_schools')
      .select('*')
      .eq('email', body.email);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    if (data.length === 0) {
      throw new HttpException(
        'Não foi possível entrar',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await bcrypt.compare(body.password, data[0].password);

    if (!isMatch) {
      throw new HttpException(
        'Não foi possível entrar',
        HttpStatus.BAD_REQUEST,
      );
    }

    return 'Usuário logado com sucesso!';
  }

  async getStudents(account: string): Promise<string | Response> {
    let accountData = account;
    if (!account.startsWith('0x')) {
      const { data, error } = await supabase
        .from('gov_schools')
        .select('*')
        .eq('email', account);

      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      accountData = data[0].address;
    }

    const contract = new DappKitFunctions();
    const res = await contract.adminGetTransaction('getStudentsBySchool', [
      accountData.toString(),
    ]);

    if (res.length === 0) {
      return 'No students found!';
    }

    const { data: students, error: studentsError } = await supabase
      .from('gov_people')
      .select('id, name, email, address, course')
      .in('address', res);

    if (studentsError) {
      throw new HttpException(studentsError.message, HttpStatus.BAD_REQUEST);
    }

    const studentsWithStatus = [];

    for (const student of students) {
      const studentData = await contract.adminGetTransaction(
        'allowedSchoolsStatus',
        [student.address, accountData],
      );
      console.log(studentData);
      studentsWithStatus.push({ ...student, status: studentData });
    }

    return { message: 'All students get!', data: studentsWithStatus };
  }

  async createPerson(
    schoolAccount: string,
    body: CreatePersonBody,
  ): Promise<string> {
    if (!schoolAccount.startsWith('0x')) {
      const { data, error } = await supabase
        .from('gov_schools')
        .select('*')
        .eq('email', schoolAccount);

      if (error) {
        throw new Error(error.message);
      }

      schoolAccount = data[0].address;
    }

    const web3: Web3 = new Web3(
      `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}}`,
    );
    const { address, privateKey }: CreateAccountResponse =
      web3.eth.accounts.create();

    const contract = new DappKitFunctions();

    await contract.adminSendTransaction('createStudent', [
      address,
      schoolAccount,
    ]);

    const { error } = await supabase.from('gov_people').insert([
      {
        name: body.name,
        email: body.email,
        course: body.course,
        address: address,
        private_key: privateKey,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return 'Person created successfully!';
  }
}
