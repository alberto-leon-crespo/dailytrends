import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { GetAllNewsQuery } from '../../application/querys/get-all-news.query';

@Controller('feeds')
export class NewController {
  public constructor(private getAllNewsQuery: GetAllNewsQuery) {}

  @Get('/news')
  public async getNews() {
    return await this.getAllNewsQuery.run();
  }
}
