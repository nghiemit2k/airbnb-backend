import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateReservationDto {
    @IsOptional()
    @IsString()
    id: string;

    // @IsNotEmpty()
    // @IsString()
    // propertyId: string;
    // TODO: add validation for YYYY-MM-DD (MM should be 01-12, DD 01-31)
    @IsOptional()
    @IsString()
    startDate: string;

    // TODO: add validation for YYYY-MM-DD
    // TODO: add validation for startDate < endDate
    @IsOptional()
    @IsString()
    endDate: string;

    // extract from token
    userId: string;
}