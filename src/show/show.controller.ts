import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { Show } from './entities/show.entity';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { Roles } from '../user/decorator/roles.decorator';
import { Role } from 'src/user/userRole.type';
import { addHours } from 'date-fns';
import { ApiQuery } from '@nestjs/swagger';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Roles(Role.Admin)
  @Post()
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  async registerShow(@Body() createShowDto: CreateShowDto): Promise<object> {
    createShowDto.endTime = addHours(createShowDto.endTime, 9);
    createShowDto.startTime = addHours(createShowDto.startTime, 9);

    if (createShowDto.endTime <= createShowDto.startTime) {
      throw new BadRequestException('begin is same to end or later than end');
    }
    return await this.showService.registerShow(createShowDto);
  }

  //query받자
  @Get('/all')
  @ApiQuery({ name: 'search', required: false })
  async findAll(@Query('search') search?: string): Promise<Show[]> {
    return await this.showService.findAll(search);
  }

  @Get(':id')
  async getDetailInfo(@Param('id') id: number): Promise<object> {
    return await this.showService.getDetailInfo(id);
  }
}
