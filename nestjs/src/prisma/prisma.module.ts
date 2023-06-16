import { Global, Module, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
