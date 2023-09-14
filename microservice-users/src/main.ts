import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMQ } from './common/constanst';


async function bootstrap() {
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: RabbitMQ.UserQueue,
     

      },
    });

    await app.listen();


  console.log(`Microservice Users is listening`);
}
bootstrap();
