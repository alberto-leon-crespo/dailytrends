import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  collection: 'News',
})
export class New {
  @Prop()
  author: string;
  @Prop()
  title: string;
  @Prop()
  url: string;
  @Prop()
  feed_id: string;
}

export type NewDocument = HydratedDocument<New>;
export const NewSchema = SchemaFactory.createForClass(New);
