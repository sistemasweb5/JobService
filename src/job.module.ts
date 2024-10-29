import { Module } from "@nestjs/common";
import { CreateJobUseCase } from "src/application/use-cases/create-job.use-case";
import { PrismaModule } from "src/infrastructure/persistence/prisma/prisma.module";
import { PrismaJobRepository } from "src/infrastructure/persistence/repositories/prisma-job.repository";
import { JobResolver } from "src/presentation/graphql/resolvers/job.resolver";
import { DeleteJobUseCase } from "./application/use-cases/delete-job.use-calse";

@Module({
  imports: [PrismaModule],
  providers: [
    JobResolver,
    CreateJobUseCase,
    DeleteJobUseCase,
    {
      provide: 'IJobRepository',
      useClass: PrismaJobRepository,
    }
  ],
  exports: ['IJobRepository']
})
export class JobModule {}