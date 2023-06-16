import { Process, Processor } from '@nestjs/bull';
import { ReportsService } from '../reports/reports.service';
import { Job } from 'bull';

@Processor('reports')
export class ReportsJobService {
  constructor(private reportService: ReportsService) {}

  @Process()
  async produce(job: Job<{ reportId: number }>) {
    await this.reportService.produce(job.data.reportId);
    return {};
  }
}
