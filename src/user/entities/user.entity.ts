import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 1000000 })
  point: number;

  @Column({ default: false })
  is_admin: boolean;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
