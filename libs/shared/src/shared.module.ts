import { DynamicModule, Module } from "@nestjs/common";
import { SharedService } from "./shared.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { AuthGuard } from "./auth.guard";



@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './.env'
        }),
    ],
    providers: [SharedService, AuthGuard],
    exports: [SharedService, AuthGuard]
})
export class SharedModule {
    static registerRmq(service: string, queue: string): DynamicModule {

        return {
            module: SharedModule,
            providers: [
                {
                    provide: service,
                    useFactory: (ConfigService: ConfigService) => {
                        const USER = ConfigService.getOrThrow('RABBITMQ_USER')
                        const PASSWORD = ConfigService.getOrThrow('RABBITMQ_PASS')
                        const HOST = ConfigService.getOrThrow('RABBITMQ_HOST')
                        return ClientProxyFactory.create({
                            transport: Transport.RMQ,
                            options: {
                                urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                                queue,
                                queueOptions: {
                                    durable: true
                                }
                            }
                        })
                    },
                    inject: [ConfigService]
                },
            ],
            exports: [service],
        }
    }

}