import { Controller, Get } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { AuthGuard } from 'libs/shared/src/auth.guard';
import { SharedService } from 'libs/shared/src/shared.service';

@Controller()
export class PresenceController {
  constructor(private readonly presenceService: PresenceService,
    private readonly shardService: SharedService,
    private readonly authGuard: AuthGuard,
  ) { }

  @MessagePattern({ cmd: 'get-presence' })
  async getUser(@Ctx() context: RmqContext) {
    this.shardService.acknowledgeMessage(context)
    console.log(123, this.authGuard.hasJwt())
    return this.presenceService.getHello()
  }
}
