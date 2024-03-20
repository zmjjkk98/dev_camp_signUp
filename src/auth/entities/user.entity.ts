import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserRole = 'admin' | 'user';


@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn({unsigned: true})
  id: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'varchar'})
  email: string;

  @Column({type: 'varchar'})
  password: string;

  @Column({type: 'varchar', length: 50})
  phone: string;

  @Column({type: 'varchar', length: 50})
  role: UserRole;

  
  @Column({nullable: true})
  regNo: string

  
  @Column({default: false})
  isPersonalInforVerified: boolean;


}