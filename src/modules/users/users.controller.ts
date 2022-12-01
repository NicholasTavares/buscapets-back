import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
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

  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    return this.userService.findUser(user_id);
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

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  @UseInterceptors(FileInterceptor('user_picture'))
  update(
    @Req() req: any,
    @Body() updateUserDTO: UpdateUserDTO,
    @UploadedFile() user_picture: Express.Multer.File,
  ) {
    updateUserDTO.user_picture = user_picture;
    return this.userService.updateUser(req.user.id, updateUserDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  remove(@Req() req: any) {
    return this.userService.softRemoveUser(req.user.id);
  }
}
