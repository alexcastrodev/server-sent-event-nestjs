import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Sse,
  MessageEvent,
  Res,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { defer, repeat, map, Observable, tap } from 'rxjs';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  @Get()
  all() {
    return this.reportService.all();
  }

  @Post()
  request() {
    return this.reportService.request();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.reportService.findOne(id);
  }

  @Sse('/:id/events')
  events(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() response: Response,
  ): Observable<MessageEvent> {
    return defer(() => this.reportService.findOne(id)).pipe(
      repeat({
        delay: 1000,
      }),
      tap((report) => {
        if (report.status === 'DONE') {
          setTimeout(() => {
            response.end();
          }, 1000);
        }
      }),
      map((report) => ({
        type: 'message',
        data: report,
      })),
    );
  }
}
