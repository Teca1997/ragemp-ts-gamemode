import { Module } from '@nestjs/common';
import { CommandProcessor } from './commandProcessor';

@Module({
	exports: [CommandProcessor],
	providers: [CommandProcessor]
})
export class CommandProcessorModule {}
