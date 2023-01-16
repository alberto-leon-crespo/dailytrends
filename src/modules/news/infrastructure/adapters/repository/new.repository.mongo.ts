import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Optional } from 'typescript-optional';
import { NewRepository } from '../../../domain/ports/new.repository';
import { New } from '../../../domain/new';
import NewMapper from '../../mapper/new.mapper';
import { New as NewDefinition, NewDocument } from '../schema/new.schema';

@Injectable()
export class NewRepositoryMongo implements NewRepository {
  constructor(
    @InjectModel(NewDefinition.name) private newModel: Model<NewDocument>,
  ) {}

  public async getAll(): Promise<New[]> {
    const news = await this.newModel.find();
    return NewMapper.toDomains(news);
  }

  public async createNew(newData: New): Promise<Optional<New>> {
    let newCreated = new this.newModel(newData);
    newCreated = await newCreated.save();
    return NewMapper.toDomain(newCreated);
  }

  public async getNew(newId: string): Promise<Optional<New>> {
    const newObject = await this.newModel.findById(newId);
    return NewMapper.toDomain(newObject);
  }
}
