import { Document } from 'mongoose';

export interface FeedEntity extends Document {
  name: string;
  url: string;
}
