import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor() {
        const databaseUrl = process.env.DATABASE_URL;
        super({
            datasources: {
                db: {
                    url: databaseUrl,
                },
            },
        });
    }
    async onModuleInit() {
        await this.$connect();
    }
}