import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/database/entity.repository';
import { Post, PostDocument } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
 

@Injectable()
export class PostRepository extends EntityRepository<PostDocument> {
  constructor(@InjectModel(Post.name) postModel: Model<PostDocument>) {
    super(postModel)
  }
}
