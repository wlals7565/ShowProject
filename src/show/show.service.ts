import { Injectable } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { ShowRepository } from './show.repository';
import { Show } from './entities/show.entity';

@Injectable()
export class ShowService {
  constructor(private showRepository: ShowRepository) {}

  async registerShow(createShowDto: CreateShowDto): Promise<object> {
    return await this.showRepository.registerShow(createShowDto);
  }

  async findAll(search: string): Promise<Show[]> {
    return await this.showRepository.findAll(search);
  }

  async getDetailInfo(id: number): Promise<object> {
    return await this.showRepository.getDetailInfo(id);
  }
}
