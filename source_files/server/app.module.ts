import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/config';
import { FeaturesModule } from 'features/features,module';
import { EventManager } from 'managers/event,manager';

@Module({
	imports: [FeaturesModule, TypeOrmModule.forRoot(dataSourceOptions)],
	providers: [EventManager]
})
export class AppModule {}
