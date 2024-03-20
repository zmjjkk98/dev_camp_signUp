import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SignupResDto } from '../dtos/signup-res.dto';
import { UserService } from '../services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService
  ){}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<SignupResDto>{

    const user = await this.userService.createUser(createUserDto);

    return{
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    };
  }
 }
