import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { UserModule } from 'src/user/user.module';
import { ShowRepository } from './show.repository';

//TODO: rolesguards만들기
@Module({
  imports: [TypeOrmModule.forFeature([Show]), UserModule],
  controllers: [ShowController],
  providers: [ShowService, ShowRepository],
})
export class ShowModule {}
