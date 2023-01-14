import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({
  collection: 'Feeds',
})
export class Feed {
  @Prop()
  name: string;

  @Prop()
  url: string;
}

export type FeedDocument = HydratedDocument<Feed>;
export const FeedSchema = SchemaFactory.createForClass(Feed);
