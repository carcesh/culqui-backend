export interface ICardRequest {
    card_number: number;
    cvv: number;
    expiration_month: string;
    expiration_year: string;
    email: string;
}