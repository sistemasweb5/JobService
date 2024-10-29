import { Module } from "@nestjs/common";
import { CreateJobUseCase } from "src/application/use-cases/create-job.use-case";
import { PrismaModule } from "src/infrastructure/persistence/prisma/prisma.module";
import { PrismaJobRepository } from "src/infrastructure/persistence/repositories/prisma-job.repository";
import { JobResolver } from "src/presentation/graphql/resolvers/job.resolver";
import { UserModule } from "./services/user-management/user.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from "./domain/entities/job.entity";

@Module({
  imports: [PrismaModule, UserModule, TypeOrmModule.forFeature([Job])],
  providers: [
    JobResolver,
    CreateJobUseCase,
    UserModule,
    {
      provide: 'IJobRepository',
      useClass: PrismaJobRepository,
    }
  ],
  exports: ['IJobRepository']
})
export class JobModule {}