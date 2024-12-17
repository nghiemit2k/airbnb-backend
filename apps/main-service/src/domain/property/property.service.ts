import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
@Injectable()
export class PropertyService {
    constructor(private databaseService: DatabaseService) { }
    create(data: CreatePropertyDto) {
        return this.databaseService.property.create({
            data: {
                name: data.name,
                tagLine: data.tagLine,
                description: data.description,
                price: data.price,
                coverUrl: data.coverUrl,
                guests: data.guests,
                bedrooms: data.bedrooms,
                beds: data.beds,
                baths: data.baths,
                categoryId: data.categoryId,
                creatorId: data.creatorId,
            },
        });
    }

    async findOrFailById(propertyId: string) {
        const property = await this.databaseService.property.findUnique({
            where: { id: propertyId },
        });
        if (!property) {
            throw new NotFoundException('Property not found');
        }
        return property;
    }

    async updateOrFailById(propertyId: string, data: UpdatePropertyDto) {
        await this.findOrFailById(propertyId);
        return this.databaseService.property.update({
            where: { id: propertyId },
            data: data,
        });

    }

    async deleteById(propertyId: string) {
        await this.findOrFailById(propertyId);
        return this.databaseService.property.delete({
            where: { id: propertyId },
        });
    }
}