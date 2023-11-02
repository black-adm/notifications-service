import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { SendNotification } from "./send-notification";

describe('Send notification', () => {
    test('Deve ser capaz de enviar uma notificação.', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const sendNotification = new SendNotification(notificationsRepository);

        const { notification } = await sendNotification.execute({
            content: 'Ajuste nos valores mensais dos servidores.',
            category: 'corporativo',
            recipientId: 'recip-2023-11-01-345'            
        });

        expect(notificationsRepository.notifications).toHaveLength(1);
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    });
});