import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() createUserDto: CreateUserDto): Promise<object> {
    if (createUserDto.password == createUserDto.passwordConfirm) {
      return await this.userService.signup(createUserDto);
    } else {
      throw new BadRequestException('password not match passwordConfirm');
    }
  }

  @UsePipes(ValidationPipe)
  @Post('signin')
  async signin(
    @Body() signinUserDto: SigninUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.userService.signin(signinUserDto);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  async getMyProfile(@GetUser() user: User) {
    return {
      code: 200,
      message: 'you successfully get your profile',
      email: user.email,
      point: user.point,
    };
  }
}
