import { DataSource, Like, Repository } from 'typeorm';
import { Show } from './entities/show.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { addHours, isAfter } from 'date-fns';

@Injectable()
export class ShowRepository extends Repository<Show> {
  constructor(private dataSource: DataSource) {
    super(Show, dataSource.createEntityManager());
  }

  async registerShow(createShowDto: CreateShowDto): Promise<object> {
    const show = this.create(createShowDto);
    try {
      this.save(show);
    } catch (error) {
      throw new ConflictException('데이터베이스 에러');
    }
    return { code: 201, message: 'you successfuly register show' };
  }

  async findAll(search?: string): Promise<Show[]> {
    // search가 정의되지 않았으면 전체 목록을 가져옴
    const query = search ? { where: { name: Like(`%${search}%`) } } : {};

    return this.find(query);
  }

  async getDetailInfo(id: number): Promise<object> {
    const show: any = await this.findOneBy({ id });

    if (!show) {
      throw new NotFoundException(`Show with id ${id} not found`);
    }

    // seat가 0이면 reservable을 true로, 아니면 false로 설정
    show.reservable = show.seat !== 0;

    // 현재 시간과의 차이가 3시간 이내라면 reservable을 false로 설정
    const currentDateTime = addHours(new Date(), 9);
    const threeHoursafter = addHours(currentDateTime, 3);

    if (isAfter(show.startTime, threeHoursafter) && show.seat !== 0) {
    } else {
      show.reservable = false;
    }

    return show;
  }
}
