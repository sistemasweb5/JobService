import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './client.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('specialty')
export class Specialty {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Client)
  @ManyToOne(() => Client, client => client.specialty)
  client: Client;
}
