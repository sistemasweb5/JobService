import { Injectable } from "@nestjs/common";
import { Job } from "src/domain/entities/job.entity";
import { IJobRepository } from "src/domain/repositories/job.repository.interface";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { Location } from "src/domain/value-objects/location.value-object";
import { UUID } from "crypto";

@Injectable()
export class PrismaJobRepository implements IJobRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Job | null> {
    const result = await this.prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT 
        id,
        user_client_id,
        user_worker_id,
        job_type,
        status,
        description,
        created_at,
        price,
        ST_X(location::geometry) as longitude,
        ST_Y(location::geometry) as latitude
      FROM jobs 
      WHERE id = CAST(${id} AS uuid)
    `);

    if (!result || result.length === 0) {
      return null;
    }

    return this.mapToEntity(result[0]);
  }

  async create(job: Job): Promise<Job> {
    const point = job.location.toPoint();
    const result = await this.prisma.$queryRaw<any[]>(Prisma.sql`
      INSERT INTO jobs (
        user_client_id,
        user_worker_id,
        created_at,
        job_type,
        status, 
        description,
        price,
        location
      ) VALUES (
        CAST(${job.userClientId} AS uuid),
        CAST(${job.userWorkerId} AS uuid),
        ${job.createdAt},
        ${job.jobType},
        ${job.status},
        ${job.description},
        ${job.price},
        ST_GeomFromText(${point}, 4326)
      ) 
      RETURNING 
        id,
        user_client_id,
        user_worker_id,
        job_type,
        status,
        description,
        created_at,
        price,
        ST_X(location::geometry) as longitude,
        ST_Y(location::geometry) as latitude
    `);

    if (!result || result.length === 0) {
      throw new Error("Error creating job entry");
    }

    return this.mapToEntity(result[0]);
  }

  async update(idActualJob: string, updateJob: Job): Promise<Job> 
  {
    const actualJob = await this.findById(idActualJob);
    if (actualJob !== null ) {
      const point = updateJob.location.toPoint();
      const result = await this.prisma.$queryRaw<any[]>(Prisma.sql`
        UPDATE jobs
        SET
          user_client_id = CAST(${updateJob.userClientId} AS uuid),
          user_worker_id = CAST(${updateJob.userWorkerId} AS uuid),
          created_at = ${updateJob.createdAt},
          job_type = ${updateJob.jobType},
          status = ${updateJob.status},
          description = ${updateJob.description},
          price = ${updateJob.price},
          location = ST_GeomFromText(${point}, 4326)
        WHERE id = CAST(${idActualJob} AS uuid)
        RETURNING 
          id,
          user_client_id,
          user_worker_id,
          job_type,
          status,
          description,
          created_at,
          price,
          ST_X(location::geometry) as longitude,
          ST_Y(location::geometry) as latitude
      `);

      if (!result || result.length === 0) {
        throw new Error("Error updating job entry");
      }
      return this.mapToEntity(result[0]);
    }
    return this.mapToEntity({});
  }

  private mapToEntity(raw: any): Job {
    return new Job({
      id: raw.id,
      userClientId: raw.user_client_id,
      userWorkerId: raw.user_worker_id,
      jobType: raw.job_type,
      status: raw.status,
      description: raw.description,
      createdAt: raw.created_at,
      price: raw.price,
      location: new Location(raw.latitude, raw.longitude)
    });
  }
}
