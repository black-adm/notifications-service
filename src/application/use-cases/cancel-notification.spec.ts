import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notificaton";
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";

describe('Cancel notification', () => {
    test('Deve ser capaz de cancelar uma notificação.', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = new Notification({
            category: 'segurança',
            content: new Content('Novo dispositivo conectado na sua conta.'),
            recipientId: 'recip-2023-11-02-789',
        })

        await notificationsRepository.create(notification)
        await cancelNotification.execute({
            notificationId: notification.id
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date)
        );
    });
});