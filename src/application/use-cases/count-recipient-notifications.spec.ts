import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { makeNotification } from "@test/factories/notification-factory";

describe('Count recipients notifications', () => {
    test('Deve ser capaz de contar notificações de destinatários.', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(
            notificationsRepository
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recip-2023-11-02-912' })
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recip-2023-11-02-912' })
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recip-2023-11-02-288' })
        );

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'recip-2023-11-02-912',
        });

        expect(count).toEqual(2);
    });
});