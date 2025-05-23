import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('jobs')
export class JobsController {
  @Get('refs')
  findJobJefs(@Req() req: Request) {
    console.log('Controller: ', req['ua']);
    return { success: true, message: 'Job refs list' };
  }

  @Post('refs')
  createJobRef() {
    return { success: true, message: 'Job ref created' };
  }

  @Put(':jobId')
  updateJobId(@Param('jobId', ParseIntPipe) jobId: number) {
    return { success: true, message: 'Job updated' };
  }
}
