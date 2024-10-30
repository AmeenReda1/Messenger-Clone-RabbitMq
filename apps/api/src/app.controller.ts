import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('PRESENCE_SERVICE') private readonly presenceService: ClientProxy

  ) { }


  @Get()
  async GetUser() {
    return this.authService.send({
      cmd: 'get-user',
    },
      {},

    )
  }
  @Post('auth')
  async postUser() {
    return this.authService.send({
      cmd: 'post-user',
    },
      {},

    )
  }
  @Get('presence')
  async GetPresence() {
    return this.presenceService.send({
      cmd: 'get-presence',
    },
      {},

    )
  }
}
