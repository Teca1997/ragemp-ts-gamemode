import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/config';
import { FeaturesModule } from 'features/features,module';
import { EventManager } from 'managers/event,manager';

@Module({
	imports: [FeaturesModule, TypeOrmModule.forRoot(dataSourceOptions)],
	providers: [EventManager]
})
export class AppModule {}

async function bootstrap() {
	await NestFactory.createApplicationContext(AppModule);
	console.log(`Server bootstrapped.`);
}

bootstrap();
