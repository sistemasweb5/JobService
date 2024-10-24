import { ApiProperty } from "@nestjs/swagger";
import { jobs } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class JobEntity implements jobs {

    @ApiProperty()
    id: string;

    @ApiProperty()
    user_client_id: string;

    @ApiProperty({required: false, nullable: true})
    user_worker_id: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    job_type: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: Decimal;

}

