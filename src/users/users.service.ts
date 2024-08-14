import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async findOne(userId: string) {
    return this.userRepository.findOne({ userId });
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate({ userId }, updateUserDto);
  }

  async remove(userId: string): Promise<User> {
    return this.userRepository.deleteOne({ userId });
  }
}
