import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

import { SendNotification } from '@application/use-cases/send-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CancelNotification } from '@application/use-cases/cancel-notificaton';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotificatons: CountRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private cancelNotification: CancelNotification
  ) { }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    });

    return {
      notification: NotificationViewModel.toHTTP(notification)
    };
  };

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    };
  }

  @Get('count/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificatons.execute({
      recipientId
    });

    return { count };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    });
  }
};
