import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { makeNotification } from "@test/factories/notification-factory";
import { GetRecipientNotifications } from "../get-recipient-notifications";

describe('Get recipients notifications', () => {
    test('Deve ser capaz de buscar notificações de destinatários.', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const getRecipientNotifications = new GetRecipientNotifications(
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

        const { notifications } = await getRecipientNotifications.execute({
            recipientId: 'recip-2023-11-02-912',
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ recipientId: 'recip-2023-11-02-912' }),
                expect.objectContaining({ recipientId: 'recip-2023-11-02-912' })
            ]),
        );
    });
});