import { Injectable } from '@nestjs/common';
import { supabase } from 'src/main';
import { DappKitFunctions } from 'src/utils/dappKitFunctions';
import PinataClient from '@pinata/sdk';
// import Web3 from 'web3';
import bcrypt from 'bcryptjs';
import { LoginBodyDto } from './dto/school.dto';

// interface CreateNFTBody {}
@Injectable()
export class SchoolService {
  private pinata: PinataClient;

  constructor() {
    // this.pinata = new PinataClient('<seu_pinata_api_key>', '<seu_pinata_api_secret>');
  }

  async mintNFT({
    image,
    metadata,
    studentAddress,
    schoolEmail,
  }): Promise<string> {
    const { data, error } = await supabase
      .from('gov_schools')
      .select('*')
      .eq('email', schoolEmail);

    if (error) {
      throw new Error(error.message);
    }

    const contract = new DappKitFunctions();

    await contract.userSendTransaction(data[0].private_key, 'issueNFT', [
      studentAddress,
    ]);

    return 'NFT created successfully!';
  }

  async sendFileToIpfs(filename, title) {
    const { IpfsHash } = await this.pinata.pinFileToIPFS(ReadableStream, {
      pinataMetadata: {
        image: filename,
        name: title,
      },
    });

    return IpfsHash;
  }

  async getSchoolNFTs(address: string): Promise<string> {
    const { data, error } = await supabase
      .from('gov_schools')
      .select('*')
      .eq('address', address);

    if (error) {
      throw new Error(error.message);
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
      throw new Error(error.message);
    }

    const isMatch = await bcrypt.compare(data[0].password, body.password);

    if (!isMatch) {
      throw new Error('Não foi possivel entrar');
    }

    return 'Usuário logado com sucesso!';
  }
}
