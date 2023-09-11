import {CardService} from "../src/service/card.service";

test('Tokeniza una tarjeta válida', async () => {
    const tarjetaValida = {
        card_number: 4111111111111111,
        cvv: 123,
        expiration_month: '12',
        expiration_year: '2025',
        email: 'carlos@gmail.com',
    };

    const cardService = new CardService();
    const result = await cardService.createToken(tarjetaValida);
    expect(typeof JSON.parse(result.body).token).toBe('string');
    expect(JSON.parse(result.body).token.length).toBe(16);
});

test('Intento de tokenizar una tarjeta inválida', async () => {
    const tarjetaInvalida = {
        card_number: 1234, // Número de tarjeta inválido
        cvv: 123,
        expiration_month: '12',
        expiration_year: '2025',
        email: 'usuario@gmail.com',
    };

    const cardService = new CardService();
    const result = await cardService.createToken(tarjetaInvalida);
    expect(JSON.parse(result.body).token).toBeNull(); // Por ejemplo, asumiendo que la función devuelve null para tarjetas inválidas
});