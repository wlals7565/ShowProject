import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { ShowModule } from './show/show.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({})], // 빈 함수로 설정
    }),
    ShowModule,
    TypeOrmModule.forRoot(typeORMConfig),
    ReservationsModule,
  ],
})
export class AppModule {}
