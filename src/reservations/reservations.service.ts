import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(private reservationsRepository: ReservationsRepository) {}

  async reserve(showId: number, userId: number): Promise<object> {
    return await this.reservationsRepository.reserve(showId, userId);
  }

  async getAllMyReservationHistory(userId: number) {
    return await this.reservationsRepository.getAllMyReservationHistory(userId);
  }
}
