import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-all-users')
  async getUsers() {
    return this.appService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.appService.getUser(id);
  }

  @Post('add')
  @UseInterceptors(
    FileInterceptor('profile_picture', {
      storage: diskStorage({
        destination: './uploads/users',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async createUser(@Body() data, @UploadedFile() file: Express.Multer.File) {
    return this.appService.createUser(data, file);
  }

  @Patch('edit/:id')
  async updateUser(@Param('id') id: string, @Body() data: any) {
    console.log({ id });
    console.log({ data });
    return this.appService.updateUser(id, data);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

  @Post('login')
  async userLogin(@Body() data: any) {
    console.log('app controller ', data);
    return this.appService.userLogin(data);
  }
}
