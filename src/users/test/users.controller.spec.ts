import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';
import { User } from '../schemas/users.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

/**
 * when @jest runs it will supply user.service form @__mocks__ folder
 */
jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    let user: User;

    beforeEach(async () => {
      user = await usersController.findOne(userStub().userId);
    });
    test('when invoked it calls findOne method of UsersService only one time', async () => {
      expect(usersService.findOne).toHaveBeenCalledTimes(1);
    });

    test('when invoked it calls findOne method of UsersService with correct args', async () => {
      expect(usersService.findOne).toHaveBeenCalledWith(userStub().userId);
    });

    test('when invoked with right arguemnt it returns right User within response', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('findAll', () => {
    let users: User[];
    beforeEach(async () => {
      users = await usersController.findAll();
    });

    test('when invoked it call findAll method of UsersService', async () => {
      expect(usersService.findAll).toHaveBeenCalled();
    });

    test('when invoked it returns right Promise<User[]> as return value', async () => {
      expect(users).toEqual([userStub()]);
    });
  });

  describe('create', () => {
    let user: User;
    let createUserDto: CreateUserDto;

    beforeEach(async () => {
      createUserDto = {
        email: userStub().email,
        age: userStub().age,
        password: userStub().password,
        pets: userStub().pets,
      };

      user = await usersController.create(createUserDto);
    });

    test('when invoked with right args it calls UsersService method create with them once', () => {
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(usersService.create).toHaveBeenCalledTimes(1);
    });

    test('when invoked with right args it returns new user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('update', () => {
    let user: User;
    let userId: string;
    let updateUserDto: UpdateUserDto;

    beforeEach(async () => {
      userId = userStub().userId;
      updateUserDto = {
        password: '6543',
        pets: ['Smoki-poki cat', 'Poopsie cuddler'],
      };

      user = await usersController.update(userId, updateUserDto);
    });

    test('when invoked with right args it calls UsersService method `update` with them once', () => {
      expect(usersService.update).toHaveBeenCalledWith(userId, updateUserDto);
      expect(usersService.update).toHaveBeenCalledTimes(1);
    });
    test('when invoked with right args it calls UsersService method `update` with them once', () => {
      expect(usersService.update).toHaveBeenCalledWith(userId, updateUserDto);
      expect(user).toEqual(userStub());
    });
  });
});
