import { Body, Controller, Param, Req } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Id } from './common/decorators/id.decorator';
import { Data } from './common/decorators/data.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'GET-USERS' })
  async getUsers() {
    return await this.appService.getAllUsers();
  }

  @MessagePattern({ cmd: 'GET-USER' })
  async getUser(id: string) {
    return await this.appService.getUser(id);
  }

  @MessagePattern({ cmd: 'CREATE-USER' })
  async createUser(@Payload() data: any) {
    const { file, ...userData } = data;
    return await this.appService.createUser(userData, file);
  }

  @MessagePattern({ cmd: 'UPDATE-USER' })
  // By custom decorator
  async updateUser(@Id('id') id: string, @Data() data: any) {
    console.log({ id });
    console.log({ data });
    return await this.appService.updateUser(id, data);
  }

  //  By Normal way
  // async updateUser(@Body() data) {
  //   console.log({ data });
  //   // console.log({ data });
  //   return await this.appService.updateUser(data.id, data);
  // }
  @MessagePattern({ cmd: 'DELETE-USER' })
  async deleteUser(id: string) {
    return await this.appService.deleteUser(id);
  }
}
