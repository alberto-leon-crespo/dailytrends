import { Module } from '@nestjs/common';
import { NewController } from './infrastructure/controllers/new.controller';
import { NewRepositoryMongo } from './infrastructure/adapters/repository/new.repository.mongo';
import {
  New as NewModel,
  NewSchema,
} from './infrastructure/adapters/schema/new.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostNewCommand } from './application/commands/post-new.command';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NewModel.name, schema: NewSchema }]),
  ],
  controllers: [NewController],
  providers: [NewModel, NewRepositoryMongo, PostNewCommand],
  exports: [NewRepositoryMongo, MongooseModule, PostNewCommand],
})
export class NewsModule {}
