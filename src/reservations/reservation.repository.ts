import { DataSource, Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { ShowRepository } from 'src/show/show.repository';
import { User } from 'src/user/entities/user.entity';
import { Show } from 'src/show/entities/show.entity';

@Injectable()
export class ReservationsRepository extends Repository<Reservation> {
  constructor(
    private dataSource: DataSource,
    private userRepository: UserRepository,
    private showRepository: ShowRepository,
  ) {
    super(Reservation, dataSource.createEntityManager());
  }

  async reserve(showId: number, userId: number): Promise<object> {
    try {
      await this.manager.transaction(async (transactionalEntityManager) => {
        const show: any = await this.showRepository.getDetailInfo(showId);

        if (show.reservable === false) {
          throw new ForbiddenException(
            'Reservation is not allowed for this show because it is not reservable',
          );
        }
        if (show.seat <= 0) {
          throw new ForbiddenException(
            'Reservation is not allowed for this show because there are no available seats',
          );
        }

        const user: User = await this.userRepository.findOneBy({ id: userId });

        if (user.point < show.price) {
          throw new ForbiddenException(
            'Reservation is not allowed for this show because you do not have enough money',
          );
        }
        show.seat -= 1;
        user.point -= show.price;

        const reservation = new Reservation();
        reservation.show = show;
        reservation.user = user;

        await transactionalEntityManager.save(Show, show);
        await transactionalEntityManager.save(User, user);
        await transactionalEntityManager.save(Reservation, reservation);
      });
    } catch (error) {
      throw new ConflictException(`${error}`);
    }
    return { code: 201, message: 'successfuly reserve' };
  }

  async getAllMyReservationHistory(userId: number): Promise<Show[]> {
    const reservations = await this.find({
      relations: ['show'],
      where: { user: { id: userId } },
    });

    // 예약된 Show 정보만 추출
    const reservedShows = reservations.map((reservation) => reservation.show);
    reservedShows.sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
    );
    return reservedShows;
  }
}
