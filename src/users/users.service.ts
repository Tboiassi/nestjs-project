import { Injectable } from '@nestjs/common';

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

   findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
      if(role) {
         return this.users.filter(users => users.role === role)
      }
      return this.users
   }

   findOne(id: number) {
      const User = this.users.find(user => user.id === id)

      return User
   }

   create(user: {name: string, regNumber: number, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
      const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
      const newUser = {
         id: usersByHighestId[0].id + 1, ...user
      }
      this.users.push(newUser)
      return newUser
   }

   update(id: number, updatedUser: { name?: string, regNumber?: number, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
      this.users = this.users.map(user => {
         if (user.id === id) {
            return { ...user, ...updatedUser}
         }
         return user
      })

      return this.findOne(id)
   }

   delete(id: number) {
      const removedUser = this.findOne(id)

      this.users = this.users.filter(user => user.id !== id)

      return removedUser
   }

}
