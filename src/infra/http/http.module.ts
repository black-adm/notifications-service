import { Module } from '@nestjs/common'
import { NotificationsController } from './controllers/notifcations.controller';

@Module({
    imports: [],
    controllers: [NotificationsController],
})

export class HttpModule {};