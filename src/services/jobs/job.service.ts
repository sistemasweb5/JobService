import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { jobs, Prisma } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async createJob(data: Prisma.jobsCreateInput): Promise<jobs> {
    return this.prisma.jobs.create({
      data,
    });
  }
}