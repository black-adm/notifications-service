import { Notification } from "../entities/notification";
import { SendNotification } from "./send-notification";

const notificationsRepository = {
    async create(notification: Notification) {
        console.log(notification);
    },
};

describe('Send notification', () => {
    test('Deve ser capaz de enviar uma notificação.', async () => {
        const sendNotification = new SendNotification(notificationsRepository);

        const { notification } = await sendNotification.execute({
            content: 'Ajuste nos valores mensais dos servidores.',
            category: 'corporativo',
            recipientId: 'recip-2023-11-01-345'            
        });

        expect(notification).toBeTruthy();
    });
});