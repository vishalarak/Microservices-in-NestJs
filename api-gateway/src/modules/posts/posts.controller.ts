import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('get-all-posts')
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Post('create-post')
  @UseInterceptors(
    FileInterceptor('images', {
      storage: diskStorage({
        destination: './uploads/posts',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async createPost(
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postsService.createPost(data, file);
  }

  @Delete('delete/:id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

  @Patch('update/:id')
  @UseInterceptors(
    FileInterceptor('images', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async updatePost(
    @Param('id') id: string,
    @Body() data: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log({ id });
    console.log({ data });
    console.log({ file });
    return this.postsService.updatePost(id, data, file);
  }
}
