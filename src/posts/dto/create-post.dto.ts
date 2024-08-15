import { OmitType } from '@nestjs/mapped-types';
import { Post } from '../schemas/post.schema';

export class CreatePostDto extends OmitType(Post, ['_id']) {}
