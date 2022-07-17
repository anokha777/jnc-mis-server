import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Role } from './Role.entity';

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(4, 20)
  username!: string;

  @Column()
  @Length(4, 100)
  password!: string;

  // @Column()
  // @IsNotEmpty()
  // role!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(()=>Role) 
    @JoinTable({
        name:'user_role',
        joinColumn:{
            name:'user',
            referencedColumnName:"id"
        },
        inverseJoinColumn:{
            name:"role",
            referencedColumnName:"id"
        }
    }) 
    role!: Role[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}