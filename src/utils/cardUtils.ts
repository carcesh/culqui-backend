import {ICardRequest} from "../shared/interface/cardRequest.interface";

export function isValidLuhn(cardNumber: string): boolean {
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');

    const digits = cleanedCardNumber.split('').map(Number);

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];

        if (isEven) {
            digit *= 2;
            if (digit >= 10) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }
    return sum % 10 === 0;
}

export function validateCardData(params: ICardRequest): void {
    if (!isValidLuhn(params.card_number!.toString())) {
        throw new Error('Número de tarjeta inválido');
    }

    const cvvLength = params.cvv.toString().trim().length;
    if (cvvLength < 3 && cvvLength > 4) {
        throw new Error('CVV no válido');
    }

    const expMLength = params.expiration_month.trim().length;
    if (expMLength !== 2) {
        throw new Error('Mes de expiración no válido');
    }
    if (!(parseInt(params.expiration_month) > 0) && !(parseInt(params.expiration_month) < 13)) {
        throw new Error('Mes de expiración no válido');
    }

    const expYLength = params.expiration_year.trim().length;
    const anoActual = new Date().getFullYear();
    if (parseInt(params.expiration_year) > (anoActual + 5)) {
        throw new Error('Año de expiración no válido');
    }
    if (expYLength !== 4) {
        throw new Error('Año de expiración no válido');
    }

    const validEmailDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
    const emailDomain = params.email!.split('@')[1];
    if (!validEmailDomains.includes(emailDomain)) {
        throw new Error('Email no válido');
    }
}

export function validarFormatoPK(pk: string): boolean {
    const format = /^pk_test_[0-9a-zA-Z]{16}$/.test(pk);
    return format;
}

export function generateToken(): string {
    const tokenLength = 16;
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
}
