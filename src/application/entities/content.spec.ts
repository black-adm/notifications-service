import { Content } from "./content"

describe('Notification content', () => {
    test('Deve ser possível criar o conteúdo da notificação', () => {
        const content = new Content('Seu processo na vaga de Full Stack avançou!');

        expect(content).toBeTruthy();
    });

    test('Não deve ser possível criar um conteúdo da notificação com menos de 5 caracteres', () => {
        expect(() => new Content('Cria')).toThrow();
    });

    test('Não deve ser possível criar um conteúdo da notificação com mais de 240 caracteres', () => {
        expect(() => new Content('Obrigado'.repeat(240))).toThrow();
    });
});
