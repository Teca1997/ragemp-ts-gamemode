import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'db/entities/Account';
import { AuthEvents } from './auth.events';
import { AuthService } from './auth.service';

@Module({
	imports: [TypeOrmModule.forFeature([Account])],
	providers: [AuthService, AuthEvents],
	exports: [AuthService]
})
export class AuthModule {}
