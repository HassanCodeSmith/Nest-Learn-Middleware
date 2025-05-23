import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JobsController } from './controllers/jobs.controller';
import { InterviewsController } from './controllers/interview.controller';
import {
  UserAgentMiddleware,
  userAgentMiddleware,
  UserAgentOptions,
} from 'src/middlewares/user-agent.middleware';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  controllers: [JobsController, InterviewsController],
  providers: [
    {
      provide: UserAgentOptions,
      useValue: ['chrome', 'firefox', 'postman'],
    },
  ],
})
export class JobsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(UserAgentMiddleware).forRoutes('jobs/r*s', 'interviews');

    consumer
      .apply(UserAgentMiddleware)
      .forRoutes(JobsController, InterviewsController);

    // consumer
    //   .apply(UserAgentMiddleware)
    //   .forRoutes(
    //     'office',
    //     { path: 'jobs/refs', method: RequestMethod.POST },
    //     InterviewsController,
    //   );

    // consumer
    //   .apply(UserAgentMiddleware)
    //   .exclude({ path: 'jobs/refs', method: RequestMethod.POST })
    //   .forRoutes(JobsController);

    // consumer
    //   .apply(AuthMiddleware, UserAgentMiddleware)
    //   .forRoutes(JobsController);
  }
}
