import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: {
        ...createEmployeeDto,
        employeeSetting: {
          create: {
            smsEnabled: true,
            notificationsOn: false,
          },
        },
      },
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role)
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });

    return this.databaseService.employee.findMany({
      include: { employeeSetting: true },
    });
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id,
      },
      include: {
        employeeSetting: {
          select: {
            smsEnabled: true,
            notificationsOn: true,
          },
        },
        post: true,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    // const employee = await this.databaseService.employee.findUnique({
    //   where: { id },
    // });

    if (!employee) throw new HttpException('Employee not found', 404);

    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }

  async updateSettings(
    id: number,
    updateEmployeeSettingsDto: Prisma.EmployeeSettingUpdateInput,
  ) {
    const employee = await this.findOne(id);

    if (!employee) throw new HttpException('employee not found', 404);

    if (!employee.employeeSetting) throw new HttpException('bad req', 400);

    return this.databaseService.employeeSetting.update({
      where: { employeeId: id },
      data: updateEmployeeSettingsDto,
    });
  }
}
