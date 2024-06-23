import { Controller } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @MessagePattern({ cmd: 'GET-POSTS' })
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @MessagePattern({ cmd: 'GET-POST' })
  async getPost(id: string) {
    return this.postsService.getPost(id);
  }

  @MessagePattern({ cmd: 'CREATE-POST' })
  async createPost(@Payload() data: any) {
    const { file, ...postData } = data;
    return this.postsService.createPost(postData, file);
  }

  @MessagePattern({ cmd: 'DELETE-POST' })
  async deletePost(id: string) {
    return this.postsService.deletePost(id);
  }

  @MessagePattern({ cmd: 'UPDATE-POST' })
  async updatePost(@Payload() data: any) {
    const { id, file, ...postData } = data;
    console.log({ id });
    console.log({ postData });
    console.log({ file });
    return this.postsService.updatePost(id, postData, file);
  }
}
