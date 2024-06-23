import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors();

  // Dynamically get the path to the uploads directory
  const uploadsPath = join(__dirname, '..', 'uploads/users');

  app.useStaticAssets(uploadsPath);

  await app.listen(3000);
  console.log(`App is running on port no ${await app.getUrl()}`);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { Transport } from '@nestjs/microservices';
// import { AppModule } from 'src/app.module';

// async function bootstrap() {
//   const port = process.env.PORT ? Number(process.env.PORT) : 8080;
//   const app = await NestFactory.createMicroservice(AppModule, {
//     transport: Transport.TCP,
//     options: {
//       host: '0.0.0.0',
//       port,
//     },
//   });
//   await app.listen();
//   console.log('Microservice listening on port:', port);
// }
// bootstrap()
