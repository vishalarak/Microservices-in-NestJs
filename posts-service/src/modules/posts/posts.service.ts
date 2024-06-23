import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllPosts() {
    try {
      const posts = await this.prisma.posts.findMany();
      if (posts.length > 0) {
        return {
          message: 'Posts fetched successfully!',
          status: true,
          data: posts,
        };
      } else {
        return {
          message: 'Posts not found!',
          status: false,
          data: null,
        };
      }
    } catch (error) {
      return {
        message: 'Error while fetching posts!',
        status: false,
        error: error,
      };
    }
  }

  async getPost(id: string) {
    try {
      const findPost = await this.prisma.posts.findFirst({ where: { id: id } });
      if (findPost) {
        return {
          message: 'Post fetched successfully!',
          status: true,
          data: findPost,
        };
      } else {
        return {
          message: 'Post not found!',
          status: false,
          data: null,
        };
      }
    } catch (error) {
      return {
        message: 'Error while fetching post!',
        status: false,
        error: error,
      };
    }
  }

  async createPost(data: any, file: any) {
    try {
      let postImage = file.filename;
      const post = await this.prisma.posts.create({
        data: {
          title: data.title,
          description: data.description,
          images: postImage,
          author_id: data.author_id,
        },
      });
      return {
        message: 'Post create successfully!',
        status: true,
        data: post,
      };
    } catch (error) {
      return {
        message: 'Error while creating post!',
        status: false,
        error: error,
      };
    }
  }

  async deletePost(id: string) {
    try {
      const findPost = this.prisma.posts.findFirst({ where: { id: id } });
      if (findPost) {
        const deletedPost = await this.prisma.posts.delete({
          where: { id: id },
        });
        return {
          message: 'Post deleted successfully!',
          status: true,
          data: deletedPost,
        };
      } else {
        return {
          message: 'Post not found!',
          status: false,
          data: null,
        };
      }
    } catch (error) {
      return {
        message: 'Error while deleting post!',
        status: false,
        error: error,
      };
    }
  }

  async updatePost(id: string, data: any, file?: any) {
    try {
      const findPost = await this.prisma.posts.findFirst({ where: { id: id } });
      if (findPost) {
        const postImage = file ? file.filename : findPost.images;
        const updatedPost = await this.prisma.posts.update({
          where: { id: id },
          data: {
            title: data.title,
            description: data.description,
            images: postImage,
          },
        });
        return {
          message: 'Post updated successfully!',
          status: true,
          data: updatedPost,
        };
      } else {
        return {
          message: 'Post not found!',
          status: false,
          data: null,
        };
      }
    } catch (error) {
      return {
        message: 'Error while updating post!',
        status: false,
        error: error,
      };
    }
  }
}
