import { Document } from 'mongoose';
import { FeedSelectors } from '../../../domain/feed.selectors';

export interface FeedEntity extends Document {
  name: string;
  url: string;

  selectors: FeedSelectors;
}
