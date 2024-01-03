import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Show extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  explain: string;

  @Column('timestamp')
  startTime: Date;

  @Column('timestamp')
  endTime: Date;

  @Column()
  location: string;

  @Column()
  seat: number;

  @Column({ nullable: true })
  img_url: string;

  @Column({ nullable: true })
  category: string;

  @Column()
  price: number;

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  reservations: Reservation[];
}
