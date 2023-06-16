import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class ReportsService {
  constructor(
    private prismaService: PrismaService,
    @InjectQueue('reports')
    private reportQueue: Queue,
  ) {}

  all() {
    return this.prismaService.report.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.report.findUnique({
      where: { id },
    });
  }

  async produce(reportId: number) {
    await this.prismaService.report.update({
      where: { id: reportId },
      data: {
        status: Status.PROCESSING,
      },
    });

    await sleep(5000);

    await this.prismaService.report.update({
      where: { id: reportId },
      data: {
        filename: `report-${reportId}.pdf`,
        status: Status.DONE,
      },
    });
  }

  async request() {
    const report = await this.prismaService.report.create({
      data: {
        status: Status.PENDING,
      },
    });

    this.reportQueue.add({ reportId: report.id });

    return report;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
