import { Inject, Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import { DRIZZLE_SYMBOL } from 'src/config/constants.config';
import { DrizzleDB } from 'src/types/db.types';

let SERVER_IS_READY = false;
@Injectable()
export class DrizzleService {
  constructor(@Inject(DRIZZLE_SYMBOL) private db: DrizzleDB) {}

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async keepAlive() {
  //   try {
  //     await this.db.execute(sql`SELECT 1;`);
  //     console.log('Keep-alive query executed successfully.');
  //     // }
  //   } catch (error) {
  //     console.error('Failed to execute keep-alive query:', error);
  //   }
  // }
}
