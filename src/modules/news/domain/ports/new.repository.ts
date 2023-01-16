import { New } from '../new';
import { Optional } from 'typescript-optional';

export interface NewRepository {
  getAll(): Promise<New[]>;

  /**
   * Returns feed filtered by id
   * @returns a `Feed` object containing the data.
   * @param id string
   */
  getNew(id: string): Promise<Optional<New>>;

  createNew(newObject: New): Promise<Optional<New>>;
}
