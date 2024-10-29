import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('jobs')
export class JobEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ name: 'user_client_id' })
    user_client_id: string;

    @Field()
    @Column({ name: 'user_worker_id', nullable: true })
    user_worker_id?: string;

    @Field()
    @Column({ name: 'job_type' })
    job_type: string;

    @Field()
    @Column({ name: 'status' })
    status: string;

    @Field()
    @Column({ name: 'description' })
    description: string;

    @Field()
    @Column({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @Field()
    @Column({ name: 'price' })
    price: number;

    @Field()
    @Column({ name: 'location' })
    location : string
}
