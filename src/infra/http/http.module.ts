import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifcations.controller';

import { SendNotification } from '@application/use-cases/send-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CancelNotification } from '@application/use-cases/cancel-notificaton';

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
        SendNotification,
        GetRecipientNotifications,
        CountRecipientNotifications,
        ReadNotification,
        UnreadNotification,
        CancelNotification
    ],
})

export class HttpModule {};