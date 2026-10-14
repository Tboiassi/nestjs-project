import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { DatabaseService } from '../database/database.service.js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { employees } from '../db/schema.js';
import { eq } from 'drizzle-orm';

@Injectable()
export class EmployeesService {
  constructor (private readonly databaseService: NodePgDatabase) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.databaseService.insert(employees).values(createEmployeeDto)
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) return this.databaseService.select().from(employees)

  }

  async findOne(id: number) {

    const [employee] = await this.databaseService
    .select()
    .from(employees)
    .where(eq(employees.id, id))
    .limit(1)

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}

