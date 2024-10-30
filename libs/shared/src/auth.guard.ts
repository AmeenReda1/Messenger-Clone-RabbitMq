import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard {
    constructor() { }
    hasJwt(){
        return {jwt:'token'};
    }

}
