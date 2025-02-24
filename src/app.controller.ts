import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { DRIZZLE_SYMBOL } from 'src/config/constants.config';
import { DrizzleDB } from 'src/types/db.types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(DRIZZLE_SYMBOL) private readonly db: DrizzleDB,
  ) {}

  @Get()
  getHello(): string {
    this.db.query.user.findFirst({
      with: {
        deposits: true,
      },
    });
    return this.appService.getHello();
  }
}
