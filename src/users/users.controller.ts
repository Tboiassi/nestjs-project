import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {

   constructor(private readonly usersService: UsersService) {}

   @Get() //GET /users
   findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
      return this.usersService.findAll(role)
   }

   @Get(':id') //GET /users/:id
   findOne(@Param('id') id: string) {
      return this.usersService.findOne(+id)
   }

   @Post() //POST /users
   create(@Body() user: {name: string, regNumber: number, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
      return this.usersService.create(user)
   }

   @Patch(':id') //PATCH /users/:id
   update(@Param('id') id: string, @Body() userUpdate: { name?: string, regNumber?: number, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
      return this.usersService.update(+id, userUpdate)
   }

   @Delete(':id') //DELETE /users/:id
   delete(@Param('id') id: string) {
      return this.usersService.delete(+id)
   }

}

// tutorial 1:02:51