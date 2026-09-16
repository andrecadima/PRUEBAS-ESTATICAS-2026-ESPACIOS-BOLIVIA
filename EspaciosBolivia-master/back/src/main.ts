import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
bootstrap();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = new Set([
    'http://localhost:3000',
    'http://localhost:4200' 
  ]);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE,PATCH', // Métodos HTTP permitidos
    credentials: true // Si necesitas cookies o cabeceras autorizadas
  });

  await app.listen(3000);
}

