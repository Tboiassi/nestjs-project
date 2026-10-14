import { IsEnum, IsNumber, IsString, Max, Min } from "class-validator"

enum Role  {intern = 'INTERN' , engineer = 'ENGINEER'}

export class CreateEmployeeDto{
   @IsString()
   name: string

   @IsNumber()
   @Min(100)
   @Max(999)
   regnumber: number
   
   @IsEnum(Role)
   role: Role
}