import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservation.repository';
import { UserRepository } from 'src/user/user.repository';
import { ShowRepository } from 'src/show/show.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from 'src/user/entities/user.entity';
import { Show } from 'src/show/entities/show.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Show]), UserModule],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    ReservationsRepository,
    UserRepository,
    ShowRepository,
  ],
})
export class ReservationsModule {}
