import { Body, Controller, Get, Param, Patch, Post, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserdto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {

   constructor(private readonly usersService: UsersService) {}

   @Get() //GET /users
   findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
      return this.usersService.findAll(role)
   }

   @Get(':id') //GET /users/:id
   findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findOne(id)
   }

   @Post() //POST /users
   create(@Body(ValidationPipe) Createuserdto: CreateUserdto) {
      return this.usersService.create(Createuserdto)
   }

   @Patch(':id') //PATCH /users/:id
   update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) Updateuserdto: UpdateUserDto) {
      return this.usersService.update(id, Updateuserdto)
   }

   @Delete(':id') //DELETE /users/:id
   delete(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.delete(id)
   }

}