import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JobModule } from './job.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { serviceModule } from './services/services.module';
import { JobEntity } from './presentation/graphql/models/JobORM.entity';
import { Client } from './services/user-management/entity/client.entity';
import { Category } from './services/user-management/entity/category.entity';
import { WorkSchedule } from './services/user-management/entity/workSchedule.entity';
import { Specialty } from './services/user-management/entity/speciality.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
      introspection: true,
      formatError: (error) => {
        return {
          message: error.message,
        };
      },
    }),
    JobModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5100,
      username: 'phaeton',
      password: 'ecliptic',
      database: 'helios',
      entities: [Client, Category, WorkSchedule, Specialty],
      synchronize: true,
    }), 
    serviceModule,
    TypeOrmModule.forRoot({
      name: 'jobservice',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'jobservice_db',
      entities: [JobEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}