import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';
import { WorkSchedule } from './workSchedule.entity';
import { Specialty } from './speciality.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('client')
export class Client {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ name: 'emailaddress' })
  email: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.clients)
  categoryid: string;

  @Field(() => WorkSchedule)
  @ManyToOne(() => WorkSchedule, (workSchedule) => workSchedule.clients, { nullable: true })
  workSchedule: string;

  @Field(() => Specialty)
  @ManyToOne(() => Specialty, specialty => specialty.client, { nullable: true })
  specialty: string;
}
