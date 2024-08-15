import { InjectModel } from '@nestjs/mongoose';
import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(
    @InjectModel(Model.name) protected readonly entityModel: Model<T>,
  ) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        __v: 0,
        _id: 0,
        ...projection,
      })
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[]> {
    return this.entityModel.find(entityFilterQuery);
  }

  async create(entity: Partial<T>): Promise<T> {
    const newEntity = new this.entityModel(entity);
    return newEntity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEnitityData: UpdateQuery<Partial<T>>,
  ): Promise<T> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEnitityData,
      {
        new: true,
      },
    );
  }

  async deleteOne(entityQuery: FilterQuery<T>): Promise<T> {
    return this.entityModel.findOneAndDelete(entityQuery);
  }
}
