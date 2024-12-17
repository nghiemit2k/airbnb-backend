import { IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdatePropertyDto {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    tagLine: string;
    @IsOptional()
    @IsString()
    description: string;
    @IsOptional()
    @IsNumber()
    price: number;
    @IsOptional()
    @IsString()
    categoryId: string;
    // @IsNotEmpty()
    // @IsString()
    // countryId: string;
    @IsOptional()
    @IsString()
    coverUrl: string;
    @IsOptional()
    @IsNumber()
    guests: number;
    @IsOptional()
    @IsNumber()
    bedrooms: number;
    @IsOptional()
    @IsNumber()
    beds: number;
    @IsOptional()
    @IsNumber()
    baths: number;
    // @IsNotEmpty()
    // @IsArray()
    // amenityIds: string[];
    // extract from token
    creatorId: string;
}