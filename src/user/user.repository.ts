import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from './dto/signin-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async signup(createUserDto: CreateUserDto): Promise<object> {
    await this.manager.transaction(async (transactionalEntityManager) => {
      const { email, password } = createUserDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.create({ email, password: hashedPassword });

      try {
        await transactionalEntityManager.save(User, user);
      } catch (error) {
        if (error.code === '23505') {
          throw new ConflictException('Existing username');
        } else {
          throw new InternalServerErrorException();
        }
      }
    });
    return { code: 201, message: 'singup is finished' };
  }

  async signin(signinUserDto: SigninUserDto): Promise<{ accessToken: string }> {
    const { email, password } = signinUserDto;
    const user = await this.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      //
      return { accessToken };
    } else {
      throw new UnauthorizedException('Login failed');
    }
  }
}
