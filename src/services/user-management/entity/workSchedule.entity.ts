import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Client } from './client.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('workSchedule')
export class WorkSchedule {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  startTime: string;

  @Field()
  @Column()
  endTime: string;

  @Field(() => Client)
  @OneToMany(() => Client, (client) => client.workSchedule)
  clients: Client[];
}
