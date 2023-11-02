import { Notification } from "./notification";
import { Content } from "./content";

describe('Notification', () => {
    test('Deve ser capaz de criar a notificação', () => {
        const notification = new Notification({
            content: new Content('Nova conexão no seu Linkedin.'),
            category: 'social',
            recipientId: 'recip-2023-11-01-123'
        });

        expect(notification).toBeTruthy();
    });

});
