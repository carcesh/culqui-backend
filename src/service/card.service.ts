import {APIGatewayProxyResult} from "aws-lambda";
import {ICardRequest} from "../shared/interface/cardRequest.interface";
import {generateToken, validarFormatoPK, validateCardData} from "../utils/cardUtils";
import {Redis} from "../database/redis";
import {ICardResponse} from "../shared/interface/cardResponse.interface";
import {Merchant} from "../database/models/merchant";
import Pg from "../database/pg";

export class CardService {
    private redis: Redis;

    constructor() {
        this.redis = new Redis();
    }

    public async createToken(params: ICardRequest): Promise<APIGatewayProxyResult> {
        try {
            validateCardData(params);
            const token = generateToken();
            await this.saveCardData(token, params);

            return {
                statusCode: 200,
                body: JSON.stringify({token}),
            };
        } catch (error: any) {
            return {
                statusCode: 400,
                body: JSON.stringify({message: error.message}),
            };
        }
    }

    public async getCard(token: string, pk: string): Promise<APIGatewayProxyResult> {
        try {
            if(!validarFormatoPK(pk)) {
                throw new Error("Comercio formato no válido")
            }

            await Pg.initialize();
            const merchantRepository = Pg.getConnection().getRepository(Merchant);
            const merchant = await merchantRepository.findOneBy({name: pk});

            if (!merchant) {
                throw new Error("Comercio no encontrado");
            }

            const data: string | null = await this.redis.get(token);
            if (!data) {
                throw new Error("Tarjeta no disponible");
            }

            const card: any = JSON.parse(data!);
            const result: ICardResponse = {
                card_number: card.card_number,
                expiration_month: card.expiration_month,
                expiration_year: card.expiration_year,
                email: card.email
            }

            return {
                statusCode: 200,
                body: JSON.stringify(result),
            };
        } catch (error: any) {
            return {
                statusCode: 400,
                body: JSON.stringify({message: error.message}),
            };
        }
    }

    private async saveCardData(token: string, params: ICardRequest) {
        try {
            await this.redis.set(token, JSON.stringify(params));
        } catch (e) {
            throw new Error("Error al guardar tarjeta");
        }
    }
}
