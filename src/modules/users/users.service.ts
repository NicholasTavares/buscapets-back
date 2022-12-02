import { Injectable } from '@nestjs/common';
import S3StorageProvider from '../../shared/providers/s3storage.provider';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }

  async findUser(user_id: string): Promise<User> {
    const user = await this.userRepository.findUser(user_id);

    return user;
  }

  async findUserByEmailForAuth(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['password', 'id', 'email'],
    });

    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    if (createUserDTO.user_picture) {
      const s3Provider = new S3StorageProvider();
      const filename = await s3Provider.saveFile(createUserDTO.user_picture);
      createUserDTO.user_picture = filename;
    }

    const user = await this.userRepository.createUser(createUserDTO);

    return user;
  }

  async updateUser(
    user_id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    if (updateUserDTO.user_picture) {
      const s3Provider = new S3StorageProvider();
      const filename = await s3Provider.saveFile(updateUserDTO.user_picture);
      updateUserDTO.user_picture = filename;
    }
    const user = await this.userRepository.updateUser(user_id, updateUserDTO);

    return user;
  }

  async softRemoveUser(user_id: string) {
    await this.userRepository.softRemoveUser(user_id);
  }
}
