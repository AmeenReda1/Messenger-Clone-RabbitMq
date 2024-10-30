import { Module } from '@nestjs/common';
import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';
import { SharedModule } from 'libs/shared/src/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [PresenceController],
  providers: [PresenceService],
})
export class PresenceModule { }
