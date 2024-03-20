import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import * as argon2 from 'argon2';
import { BusinessException } from 'src/exception/BusinessException';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
  ){}


  async createUser(dto: CreateUserDto): Promise<User>{
    const user = await this.userRepo.findOneByEmail(dto.email);
    if(user) {
      throw new BusinessException(
        'user',
        `${dto.email} already exist`,
        `${dto.email} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await argon2.hash(dto.password);
    return this.userRepo.createUser(dto, hashedPassword);
  }

}
