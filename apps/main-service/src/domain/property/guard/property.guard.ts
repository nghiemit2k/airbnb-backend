import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from '../../../database/database.service';
import { PropertyService } from '../property.service';


@Injectable()
export class PropertyGuard implements CanActivate {
    constructor(
        private databaseService: DatabaseService,
        private propertyService: PropertyService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const propertyId = request.params.propertyId;
        const property = await this.propertyService.findOrFailById(propertyId);
        if (property?.creatorId !== user.id) {
            throw new ForbiddenException('You are not allowed to update this property');
        }
        return true;
    }

}