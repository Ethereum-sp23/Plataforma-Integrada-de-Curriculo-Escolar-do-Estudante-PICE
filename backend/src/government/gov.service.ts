import { Injectable } from '@nestjs/common';
import { supabase } from 'src/main';

@Injectable()
export class GovernmentService {

  async getNameByAddress(params): Promise<String> {
    const {error, data} = await supabase.from("gov_people").select("*").eq("address", params.address)
    return data[0].name
  }

}
