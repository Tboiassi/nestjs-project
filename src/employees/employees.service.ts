import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { DatabaseService } from '../database/database.service.js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { employees } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { InjectDrizzle } from '@nestjs/drizzle';

@Injectable()
export class EmployeesService {
  // constructor (private readonly databaseService: NodePgDatabase) {}
  constructor(
    @InjectDrizzle() private readonly databaseService: NodePgDatabase
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.databaseService.insert(employees).values(createEmployeeDto).returning();
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) { 
      return this.databaseService
      .select()
      .from(employees)
      .where(eq(employees.role, role));
    }
    return this.databaseService.select().from(employees);
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
    const [updateEmployee] = await this.databaseService
    .update(employees)
    .set(updateEmployeeDto)
    .where(eq(employees.id, id))
    .returning()

    if (!updateEmployee) {
      throw new NotFoundException(`Employee with ID ${id} was not found`)
    }

    return updateEmployee;
  }

  async remove(id: number) {
    const [deleteEmployee] = await this.databaseService
    .delete(employees)
    .where(eq(employees.id, id))
    .returning();

    if (!deleteEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`)
    }
    return {
      message: `Employee with ID ${id} successfully deleted`,
      deleteEmployee,
    };
  }
}

