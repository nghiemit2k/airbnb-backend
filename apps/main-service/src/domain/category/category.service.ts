import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class CategoryService {
    constructor(private readonly databaseService: DatabaseService) { }

    async onModuleInit() {
        const categories = await this.databaseService.category.findMany();
        if (categories.length > 0) return;
        await this.databaseService.category.createMany({
            data: [
                { name: 'cabin', description: 'cabin' },
                { name: 'airstream', description: 'airstream' },
                { name: 'tent', description: 'tent' },
                { name: 'warehouse', description: 'warehouse' },
            ],
        });
    }
    async findMany({ skip, take }: { skip: number; take: number }) {
        const categories = await this.databaseService.category.findMany({
            skip: Number(skip) || 0,
            take: Number(take) || 10,
        });
        return categories;
    }
}
