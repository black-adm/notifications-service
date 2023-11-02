import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifcations.controller';
import { SendNotification } from '@application/use-cases/send-notification';

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [SendNotification],
})

export class HttpModule {};