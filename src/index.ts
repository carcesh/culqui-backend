import {CardController} from "./controllers/card.controller";
import {APIGatewayProxyEvent} from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {
    const cardController = new CardController();

    if (event.pathParameters) {
        const {token} = event.pathParameters!;
        const {Authorization} = event.headers;
        if (token && Authorization) {
            return await cardController.getCard(token, Authorization.replace("Bearer ", ""));
        }
    } else {
        const {card_number, cvv, expiration_month, expiration_year, email} = JSON.parse(event.body!);
        return await cardController.createToken({card_number, cvv, expiration_month, expiration_year, email});
    }
}