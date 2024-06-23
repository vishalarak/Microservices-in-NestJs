import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { MessagePattern } from '@nestjs/microservices';
import { Data } from 'src/common/decorators/data.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'USER-LOGIN' })
  async signIn(@Body() data: any) {
    console.log({ data });
    return this.authService.signIn(data.email, data.password);
  }
}
