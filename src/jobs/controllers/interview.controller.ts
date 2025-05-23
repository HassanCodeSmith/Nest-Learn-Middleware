import { Controller, Get, Post } from '@nestjs/common';

@Controller('interviews')
export class InterviewsController {
  @Get()
  findInterviews() {
    return { success: true, message: 'Interview list' };
  }

  @Post('schedule')
  scheduleInterview() {
    return { success: true, message: 'Interview scheduled' };
  }
}
