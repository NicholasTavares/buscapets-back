import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findAll(): Promise<User[]> {
    const users = await this.find();

    return users;
  }

  async findUser(user_id: string): Promise<User> {
    const user = await this.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ID ${user_id} not found`);
    }

    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = this.create(createUserDTO);

    try {
      await this.save(user);
    } catch (error) {
      const DUPLICATE_MYSQL_ERROR = 1062;
      if (error.errno === DUPLICATE_MYSQL_ERROR) {
        throw new ConflictException('Email already exists');
      }

      throw new InternalServerErrorException();
    }

    return user;
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.preload({
      id,
      ...updateUserDTO,
    });

    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }

    await this.save(user);

    return user;
  }

  async softRemoveUser(id: string) {
    await this.softRemove({ id });
  }
}
