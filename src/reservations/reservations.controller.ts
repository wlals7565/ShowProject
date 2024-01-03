import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post(':id')
  @UseGuards(AuthGuard())
  async reserve(
    @Param('id') showId: number,
    @GetUser() user: User,
  ): Promise<object> {
    return await this.reservationsService.reserve(showId, user.id);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllMyReservationHistory(@GetUser() user: User) {
    return await this.reservationsService.getAllMyReservationHistory(user.id);
  }
}
