import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";

@Injectable()
export class UserRepository extends Repository<User>{
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ){
    super(repo.target, repo.manager, repo.queryRunner)
  }


  async findOneByEmail(email:string): Promise<User>{
      return this.repo.findOneBy({email})
  }
  
  async createUser(dto: CreateUserDto, hashedPassword:string): Promise<User>{
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = hashedPassword;
    user.phone = dto.phone;
    user.role = dto.role;

    return this.repo.save(user);

  }


}