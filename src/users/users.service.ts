import { Injectable } from '@nestjs/common';
import { CreateUserdto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
   private users = [
      {
         "id": 1,
         "name": "Treasure",
         "regNumber": 200,
         "role": "ADMIN"
      },
      {
         "id": 2,
         "name": "Akpabio",
         "regNumber": 450,
         "role": "INTERN"
      },
      {
         "id": 3,
         "name": "Sophia",
         "regNumber": 180,
         "role": "INTERN"
      },
      {
         "id": 4,
         "name": "Davies",
         "regNumber": 442,
         "role": "ENGINEER"
      },
      {
         "id": 5,
         "name": "Rose",
         "regNumber": 260,
         "role": "INTERN"
      }
   ]

   // GET
   findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
      if(role) {
         const rolesArray = this.users.filter(users => users.role === role)

         if (rolesArray.length === 0) throw new NotFoundException('User Role Not Found')
            return rolesArray
      }
      return this.users
   }

   // GET
   findOne(id: number) {
      const User = this.users.find(user => user.id === id)

      if (!User) throw new NotFoundException('User Not Found')

      return User
   }

   // POST
   create(Createuserdto: CreateUserdto) {
      const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
      const newUser = {
         id: usersByHighestId[0].id + 1, ...Createuserdto
      }
      this.users.push(newUser)
      return newUser
   }

   //PATCH
   update(id: number, Updateuserdto: UpdateUserDto) {
      this.users = this.users.map(user => {
         if (user.id === id) {
            return { ...user, ...Updateuserdto}
         }
         return user
      })

      return this.findOne(id)
   }

   // DELETE
   delete(id: number) {
      const removedUser = this.findOne(id)

      this.users = this.users.filter(user => user.id !== id)

      return removedUser
   }

}
