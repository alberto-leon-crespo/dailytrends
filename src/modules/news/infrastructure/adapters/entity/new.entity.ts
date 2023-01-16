import { Document } from 'mongoose';

export interface NewEntity extends Document {
  author: string;
  title: string;
  url: string;
  feed_id: string;
}
