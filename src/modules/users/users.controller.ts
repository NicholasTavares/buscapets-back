import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get('/find')
  findOne(@Query() query) {
    return this.userService.findUser(query);
  }

  @Post()
  @UseInterceptors(FileInterceptor('user_picture'))
  create(
    @Body() createUserDTO: CreateUserDTO,
    @UploadedFile() user_picture: Express.Multer.File,
  ) {
    createUserDTO.user_picture = user_picture;
    return this.userService.createUser(createUserDTO);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('user_picture'))
  update(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
    @UploadedFile() user_picture: Express.Multer.File,
  ) {
    updateUserDTO.user_picture = user_picture;
    return this.userService.updateUser(id, updateUserDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.softRemoveUser(id);
  }
}
