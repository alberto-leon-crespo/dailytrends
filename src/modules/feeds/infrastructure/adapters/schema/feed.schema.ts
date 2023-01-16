import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, SchemaType, SchemaTypes } from 'mongoose';
import { FeedSelectors } from '../../../domain/feed.selectors';

@Schema({
  collection: 'Feeds',
})
export class Feed {
  @Prop()
  name: string;

  @Prop()
  url: string;

  @Prop({ type: SchemaTypes.Mixed })
  selectors: FeedSelectors;
}

export type FeedDocument = HydratedDocument<Feed>;
export const FeedSchema = SchemaFactory.createForClass(Feed);
