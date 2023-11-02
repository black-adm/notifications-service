import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "../cancel-notificaton";
import { NotificationNotFound } from "../errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";

describe('Cancel notification', () => {
    test('Deve ser capaz de cancelar uma notificação.', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);
        const notification = makeNotification();

        await notificationsRepository.create(notification);
        await cancelNotification.execute({
            notificationId: notification.id
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date)
        );
    });

    test('Não deve ser possível cancelar uma notificação que não existe.', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    })
});