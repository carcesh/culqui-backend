import {CardService} from "../service/card.service"
import {ICardRequest} from "../shared/interface/cardRequest.interface";

export class CardController {
    private cardService: CardService

    constructor() {
        this.cardService = new CardService();
    }

    async createToken(params: ICardRequest) {
        return await this.cardService.createToken(params)
    }

    async getCard(token: string, pk: string) {
        return await this.cardService.getCard(token, pk);
    }
}