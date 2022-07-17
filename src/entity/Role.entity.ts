import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany
  } from 'typeorm';
  import { Length } from 'class-validator';
import { User } from './User.entity';
  
  @Entity()
  export class Role {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    @Length(4, 20)
    role!: string;

    @ManyToMany(()=>User,user=>user.role) 
    user!: User;
  
  }