import IORedis from "ioredis";

export class Redis {
    private client: IORedis

    constructor() {
        this.client = this.connection();
    }

    private connection() {
        const client = new IORedis({
            host: "127.0.0.1",
        });

        client.on("connect", () => {
            console.log("Conectado a redis");
        });

        client.on('error', (err) => {
            console.error('Error en la conexión a Redis:', err);
        });

        return client;
    }

    public async get(key: string) {
        return this.client.get(key);
    }

    public async set(key: string, value: any) {
        await this.client.set(key, value);
        await this.client.expire(key, 15 * 60);
    }
}
