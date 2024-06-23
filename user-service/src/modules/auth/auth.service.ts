import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signIn(email: string, pass: string) {
    try {
      const user = await this.prisma.users.findFirst({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const passwordMatch = await bcrypt.compare(pass, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user.id, email: user.email };

      const accessToken = await this.jwtService.signAsync(payload);

      return {
        success: true,
        message: 'Login successfully!',
        token_type: 'bearer',
        token: accessToken,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      };
    } catch (error) {
      console.error('Error during sign-in:', error);

      if (
        error instanceof UnauthorizedException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Unexpected error occurred');
    }
  }
}
