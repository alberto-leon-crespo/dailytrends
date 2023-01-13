import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class Feed extends Document {
  @Prop()
  name: string;

  @Prop()
  url: string;
}

export type FeedDocument = HydratedDocument<Feed>;
export const FeedSchema = SchemaFactory.createForClass(Feed);
