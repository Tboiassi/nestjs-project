import { Injectable, OnModuleInit } from '@nestjs/common'
import { Node } from '@nestjs/core/inspector/interfaces/node.interface.js'
import { InjectDrizzle } from '@nestjs/drizzle'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'


@Injectable()
export class DatabaseService {
   constructor(
   @InjectDrizzle()
      private readonly db: NodePgDatabase) {}
}
