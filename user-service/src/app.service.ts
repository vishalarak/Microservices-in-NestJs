import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: any, file?: any) {
    try {
      const findUser = await this.prisma.users.findFirst({
        where: { email: data.email },
      });
      if (findUser) {
        return {
          message: 'User already exist!',
          status: false,
          data: null,
        };
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      let profilePicture = file.filename;
      data.profile_picture = profilePicture;
      const user = await this.prisma.users.create({ data });

      return {
        message: 'User created successfully!',
        status: true,
        data: user,
      };
    } catch (error) {
      return {
        message: `Error while creating user`,
        status: false,
        error: error,
      };
    }
  }

  async getUser(id: string) {
    try {
      const user = await this.prisma.users.findFirst({ where: { id: id } });
      if (user) {
        return {
          message: 'User fetched successefully!',
          status: true,
          data: user,
        };
      } else {
        return {
          meesage: 'User not found!',
          status: false,
          data: null,
        };
      }
    } catch (error) {
      return {
        message: 'Error while fetching user data!',
        status: false,
        error: error,
      };
    }
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.users.findMany();
      if (users.length > 0) {
        return {
          message: 'Users fetched successfully!',
          status: true,
          data: users,
        };
      }
      return {
        message: 'No users found!',
        status: false,
        data: null,
      };
    } catch (error) {
      return {
        message: 'Error while fetching users data!',
        status: false,
        error: error,
      };
    }
  }

  async updateUser(id: string, data: any) {
    try {
      const existingUser = await this.prisma.users.findFirst({ where: { id } });
      if (!existingUser) {
        return {
          message: 'User not found!',
          status: false,
          data: null,
        };
      }

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      const updatedUser = await this.prisma.users.update({
        where: { id },
        data,
      });

      return {
        message: 'User updated successfully!',
        status: true,
        data: updatedUser,
      };
    } catch (error) {
      return {
        message: 'Error while updating user!',
        status: false,
        error: error,
      };
    }
  }
  async deleteUser(id: string) {
    try {
      const findUser = await this.prisma.users.findFirst({ where: { id: id } });
      if (findUser) {
        const deletedUser = await this.prisma.users.delete({ where: { id } });
        return {
          message: 'User deleted successfully!',
          status: true,
          data: deletedUser,
        };
      } else {
        return {
          message: 'User not found!',
          status: false,
          data: null,
        };
      }
    } catch (error) {
      return {
        message: 'Error while deleting user!',
        status: false,
        error: error,
      };
    }
  }
}
