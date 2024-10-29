import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { Client } from '../entity/client.entity';
import { Category } from '../entity/category.entity';
import { WorkSchedule } from '../entity/workSchedule.entity';
import { Specialty } from '../entity/speciality.entity';

@Resolver((of) => Client)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    ) {}

  @Query(() => [Client], { name: 'allClients' })
  async findAllClients() {
    return this.userService.findAllClients();
  }

  @Query(() => Client, { name: 'userById' })
  async findDetailUserById(@Args('id') id: string) {
    return this.userService.findDetailUserById(id);
  }

  @ResolveField((returns) => Category)
  category(@Parent() client : Client) : Promise <Category>{
    return this.userService.getCategory(client.categoryid)
  }

  @ResolveField((returns) => WorkSchedule)
  workschedule(@Parent() client : Client) : Promise <WorkSchedule>{
    return this.userService.getWorkschedule(client.workSchedule)
  }

  @ResolveField((returns) => Specialty)
  speciality(@Parent() client : Client) : Promise <Specialty>{
    return this.userService.getSpeciality(client.specialty)
  }
}
