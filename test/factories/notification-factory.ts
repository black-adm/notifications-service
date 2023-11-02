import { Notification, NotificationProps } from "@application/entities/notification";
import { Content } from "@application/entities/content";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
    return new Notification({
        category: 'social',
        content: new Content('Fábio Akita aceitou sua solicitação de amizade.'),
        recipientId: 'recip-2023-11-02-461',
        ...override,
    })
};