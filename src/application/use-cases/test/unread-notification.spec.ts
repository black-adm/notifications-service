import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { UnreadNotification } from "../unread-notification";
import { NotificationNotFound } from "../errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";

describe('Unread notification', () => {
    test('Deve ser capaz de desler uma notificação.', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);
        const notification = makeNotification({
            readAt: new Date()
        });

        await notificationsRepository.create(notification);
        await unreadNotification.execute({
            notificationId: notification.id
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull();
    });

    test('Não deve ser possível desler uma notificação que não existe.', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        expect(() => {
            return unreadNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    })
});