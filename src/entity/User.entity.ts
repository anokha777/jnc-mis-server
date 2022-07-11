import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  name!: string;

  @Column('text')
  gender!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
