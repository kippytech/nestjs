import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(
    employeeId: number,
    createPostDto: Prisma.PostCreateWithoutEmployeeInput,
  ) {
    return this.databaseService.post.create({
      data: { ...createPostDto, employeeId },
    });
  }

  createGroupPost(
    employeeIds: number[],
    createGroupPostDto: Prisma.GroupPostCreateWithoutEmployeesInput,
  ) {
    return this.databaseService.groupPost.create({
      data: {
        ...createGroupPostDto,
        employees: {
          create: employeeIds.map((employeeId) => ({ employeeId: employeeId })),
        },
      },
      // data: {
      //   title: '',
      //   description: '',
      //   employees: {
      //     create: [{employeeId: 1}, {employeeId: 2} ]
      //   }
      // },
    });
  }

  findAll() {
    return this.databaseService.groupPost.findMany({
      include: { employees: { select: { employee: true } } },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    return `${id}${updatePostDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
