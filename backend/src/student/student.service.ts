import { Injectable } from '@nestjs/common';
import { supabase } from 'src/main';

@Injectable()
export class StudentService {
  async getHello(): Promise<any> {
    const { data, error } = await supabase.from("teste").select("*");
    console.log(data)
    return data;
  }
}
