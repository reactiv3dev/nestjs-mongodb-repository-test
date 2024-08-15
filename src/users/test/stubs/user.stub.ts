import { User } from 'src/users/schemas/users.schema';

export const userStub = (): User => {
  return {
    userId: '123',
    email: 'test@test.com',
    password: '1234',
    age: 23,
    pets: ['Smoki-poki cat'],
  };
};
