import { Module } from '@nestjs/common';
import { ReportsService } from './reports/reports.service';
import { ReportsController } from './reports/reports.controller';

@Module({
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule {}
