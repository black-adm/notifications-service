import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { Notification } from "@application/entities/notification";
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { Content } from "@application/entities/content";

describe('Count recipients notifications', () => {
    test('Deve ser capaz de contar notificações de destinatários.', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(
            notificationsRepository
        );

        await notificationsRepository.create(
            new Notification({
                category: 'social',
                content: new Content('Uma nova mensagem no seu inbox.'),
                recipientId: 'recip-2023-10-02-912'
            }),
        );

        await notificationsRepository.create(
            new Notification({
                category: 'segurança',
                content: new Content('Ative a autenticação de dois fatores na sua conta.'),
                recipientId: 'recip-2023-10-02-912'
            }),
        );

        await notificationsRepository.create(
            new Notification({
                category: 'promoções',
                content: new Content('Olá Antônio, cupom de FRETE GRÁTIS disponível!'),
                recipientId: 'recip-2023-10-02-773'
            }),
        );

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'recip-2023-10-02-912',
        });

        expect(count).toEqual(2);
    });
});