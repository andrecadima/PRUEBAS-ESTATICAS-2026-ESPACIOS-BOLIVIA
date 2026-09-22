import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// The backend is compiled as CommonJS; top-level await would require an ESM migration.
// NOSONAR
NestFactory.create(AppModule).then((app) => { // NOSONAR

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

  return app.listen(3000);
}).catch((error) => { // NOSONAR
  console.error('No se pudo iniciar la aplicación:', error);
  process.exitCode = 1;
});

