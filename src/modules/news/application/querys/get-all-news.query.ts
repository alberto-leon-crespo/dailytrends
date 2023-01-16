import { Injectable } from '@nestjs/common';
import { New } from '../../domain/new';
import { UsecaseInterface } from '../../../app/application/usecase.interface';
import { NewRepositoryMongo } from '../../infrastructure/adapters/repository/new.repository.mongo';

@Injectable()
export class GetAllNewsQuery implements UsecaseInterface {
  public constructor(private newRepositoryMongo: NewRepositoryMongo) {}

  public async run(): Promise<New[]> {
    return await this.newRepositoryMongo.getAll();
  }
}
