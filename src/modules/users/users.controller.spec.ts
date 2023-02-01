import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const userEntityList = [
  {
    id: '2f09c310-6e65-44c2-a76a-44866adfc106',
    name: 'nicholasb@hotmail.com',
    email: 'nicholasb@hotmail.com',
    phone: '84999458835',
    role: 'user',
    user_picture: null,
    created_at: '2023-01-19T03:01:59.875Z',
    updated_at: '2023-01-19T03:01:59.875Z',
    deleted_at: null,
  },
  {
    id: 'bffb37c2-29ba-405c-b2a8-bc695592e99f',
    name: 'nicholasbalby@hotmail.com',
    email: 'nicholasbalby@hotmail.com',
    phone: '84999458835',
    role: 'user',
    user_picture: null,
    created_at: '2023-01-19T00:54:03.822Z',
    updated_at: '2023-01-19T00:54:03.822Z',
    deleted_at: null,
  },
];

const newUserEntity = {
  name: 'Rafaela',
  email: 'rafaela@email.com',
  password: '$2b$10$z9/mCvmHsO5Wn1FW/kACD.M5kDYSGs45gqSBQRuSknJ/B5Bqqy0DO',
  phone: '84999556633',
  user_picture: null,
  deleted_at: null,
  id: '279306e8-813a-4977-9ecb-9ece2a84c099',
  role: 'user',
  created_at: '2023-01-19T04:29:55.043Z',
  updated_at: '2023-01-19T04:29:55.043Z',
};

const updatedTodoEntity = {
  name: 'Rafaela Micaela',
};

describe('UserController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAllUsers: jest.fn().mockResolvedValue(userEntityList),
            createUser: jest.fn().mockResolvedValue(newUserEntity),
            findUser: jest.fn().mockResolvedValue(userEntityList[0]),
            updateUser: jest.fn().mockResolvedValue(updatedTodoEntity),
            softRemoveUser: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('find all users', () => {
    it('should return a todo list entity successfully', async () => {
      // Act
      const result = await usersController.findAll();

      // Assert
      expect(result).toEqual(userEntityList);
      expect(typeof result).toEqual('object');
      expect(usersService.findAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(usersService, 'findAllUsers')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new todo item successfully', async () => {
      // Arrange
      const user_picture = null;
      const body: CreateUserDTO = {
        name: 'Rafaela',
        email: 'rafaela@email.com',
        password: 'User123$',
        phone: '84999556633',
        user_picture: null,
        passwordConfirm: 'User123$',
      };

      // Act
      const result = await usersController.create(body, user_picture);

      // Assert
      expect(result).toEqual(newUserEntity);
      expect(usersService.createUser).toHaveBeenCalledTimes(1);
      expect(usersService.createUser).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const user_picture = null;
      const body: CreateUserDTO = {
        name: 'Rafaela',
        email: 'rafaela@email.com',
        password: 'User123$',
        phone: '84999556633',
        user_picture: null,
        passwordConfirm: 'User123$',
      };

      jest.spyOn(usersService, 'createUser').mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.create(body, user_picture)).rejects.toThrowError();
    });
  });

  describe('find user', () => {
    it('should get a todo item successfully', async () => {
      // Act
      const result = await usersController.findOne(
        '2f09c310-6e65-44c2-a76a-44866adfc106',
      );

      // Assert
      expect(result).toEqual(userEntityList[0]);
      expect(usersService.findUser).toHaveBeenCalledTimes(1);
      expect(usersService.findUser).toHaveBeenCalledWith(
        '2f09c310-6e65-44c2-a76a-44866adfc106',
      );
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(usersService, 'findUser').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        usersController.findOne('2f09c310-6e65-44c2-a76a-44866adfc106'),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      // Arrange
      const user_picture = null;
      const body: UpdateUserDTO = {
        name: 'Rafaela Micaela',
      };

      // Act
      const result = await usersController.update(
        '279306e8-813a-4977-9ecb-9ece2a84c099',
        body,
        user_picture,
      );

      // Assert
      expect(result).toEqual(updatedTodoEntity);
      expect(usersService.updateUser).toHaveBeenCalledTimes(1);
      expect(usersService.updateUser).toHaveBeenCalledWith(
        '279306e8-813a-4977-9ecb-9ece2a84c099',
        body,
        user_picture,
      );
    });

    it('should throw an exception', () => {
      // Arrange
      const user_picture = null;
      const body: UpdateUserDTO = {
        name: 'Rafaela Micaela',
      };

      jest.spyOn(usersController, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        usersController.update(
          '279306e8-813a-4977-9ecb-9ece2a84c099',
          body,
          user_picture,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should remove a todo item successfully', async () => {
      // Act
      const result = await usersController.remove(
        '279306e8-813a-4977-9ecb-9ece2a84c099',
      );

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(usersService, 'softRemoveUser')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        usersController.remove('279306e8-813a-4977-9ecb-9ece2a84c099'),
      ).rejects.toThrowError();
    });
  });
});
