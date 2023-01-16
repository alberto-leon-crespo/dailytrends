import { Injectable } from '@nestjs/common';
import { New } from '../../domain/new';
import { UsecaseInterface } from '../../../app/application/usecase.interface';
import { NewRepositoryMongo } from '../../infrastructure/adapters/repository/new.repository.mongo';
import { Optional } from 'typescript-optional';

@Injectable()
export class PostNewCommand implements UsecaseInterface {
  public constructor(private feedRepository: NewRepositoryMongo) {}

  public run(newObject: New): Promise<Optional<New>> {
    return this.feedRepository.createNew(newObject);
  }
}
