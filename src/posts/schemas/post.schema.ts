import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type PostDocument = Post & Document;

@Schema({ collection: 'posts' })
export class Post {
  @Prop({ _id: randomUUID() })
  _id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  isPublished: boolean;

  @Prop({ default: Date.now() })
  updatedAt: Date;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);