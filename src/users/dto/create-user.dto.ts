import { IsEmail, IsEnum, IsNumber, IsNotEmpty, IsString } from "class-validator"

export class CreateUserdto {

   @IsNotEmpty()
   @IsString()

   name: string;

   @IsNumber()
   regNumber: number;

   @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {
      message: 'Valid role required'
   })
   role: "INTERN" | "ENGINEER" | "ADMIN";
}

// tutorial 1:21:10