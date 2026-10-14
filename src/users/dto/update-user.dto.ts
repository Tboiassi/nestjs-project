import { CreateUserdto } from "./create-user.dto.js";
import { PartialType } from  "@nestjs/mapped-types"

export class UpdateUserDto extends PartialType(CreateUserdto) {}