import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
@Module({
  imports: [JobsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /**
     * For Every Route
     */
    // consumer.apply(AuthMiddleware).forRoutes('*');
    /**
     * Use of Route info object
     */
    // consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
