import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async getUsers() {
    return this.userClient.send({ cmd: 'GET-USERS' }, {});
  }

  async getUser(id: number) {
    return this.userClient.send({ cmd: 'GET-USER' }, id);
  }

  async createUser(data: any, file?: Express.Multer.File) {
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
    return this.userClient.send({ cmd: 'CREATE-USER' }, payload);
  }

  async updateUser(id: string, data: any) {
    return this.userClient.send({ cmd: 'UPDATE-USER' }, { id, data });
  }

  async deleteUser(id: string) {
    return this.userClient.send({ cmd: 'DELETE-USER' }, id);
  }

  async userLogin(data: any) {
    console.log('app service', data);
    return this.userClient.send({ cmd: 'USER-LOGIN' }, data);
  }
}
