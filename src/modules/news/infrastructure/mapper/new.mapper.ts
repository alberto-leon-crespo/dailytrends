import { Optional } from 'typescript-optional';
import { New } from '../../domain/new';
import { NewEntity } from '../adapters/entity/new.entity';

export default class NewMapper {
  public static toDomain(newEntity: NewEntity): Optional<New> {
    if (!newEntity) {
      return Optional.empty<New>();
    }
    const newObject = new New(
      newEntity.id,
      newEntity.author,
      newEntity.title,
      newEntity.feed_id,
    );
    return Optional.of(newObject);
  }

  public static toDomains(newsEntities: NewEntity[]): New[] {
    const news = new Array<New>();
    newsEntities.forEach((newEntity) => {
      const newObject = this.toDomain(newEntity);
      news.push(newObject.get());
    });
    return news;
  }
}
