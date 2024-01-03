import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { SigninUserDto } from './dto/signin-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async signup(createUserDto: CreateUserDto): Promise<object> {
    return await this.userRepository.signup(createUserDto);
  }

  async signin(signinUserDto: SigninUserDto): Promise<{ accessToken: string }> {
    return await this.userRepository.signin(signinUserDto);
  }
}
