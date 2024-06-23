import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostsService {
  constructor(@Inject('NA') private readonly postsClient: ClientProxy) {}

  async getPosts() {
    return this.postsClient.send({ cmd: 'GET-POSTS' }, {});
  }

  async createPost(data: any, file?: Express.Multer.File) {
    const payload = {
      ...data,
      file: file
        ? {
            originalname: file.originalname,
            filename: file.filename,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
          }
        : null,
    };
    console.log({ payload });
    return this.postsClient.send({ cmd: 'CREATE-POST' }, payload);
  }

  async getPost(id: string) {
    return this.postsClient.send({ cmd: 'GET-POST' }, id);
  }

  async deletePost(id: string) {
    return this.postsClient.send({ cmd: 'DELETE-POST' }, id);
  }

  async updatePost(id: string, data: any, file?: Express.Multer.File) {
    const payload = {
      id,
      ...data,
      file: file
        ? {
            originalname: file.originalname,
            filename: file.filename,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
          }
        : null,
    };
    console.log({ payload });
    return this.postsClient.send({ cmd: 'UPDATE-POST' }, payload);
  }
}
