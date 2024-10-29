import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Client } from './client.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('category')
export class Category {
  
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  rol: string;

  @Field(() =>[Client]) 
  @OneToMany(() => Client, client => client.categoryid)
  clients: Client[];
}
