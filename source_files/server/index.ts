import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';
import './prototypes';

async function bootstrap() {
	await NestFactory.createApplicationContext(AppModule);
	console.log(`Server bootstrapped.`);
}

bootstrap();
