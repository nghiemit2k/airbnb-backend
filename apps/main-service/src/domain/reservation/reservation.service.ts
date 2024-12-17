import { BadRequestException, Injectable } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { PropertyService } from "../property/property.service";
import dayjs from "dayjs";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { NotFoundException } from "@nestjs/common";
import { DateUtils } from "../../utils/date.utils";
@Injectable()
export class ReservationService {
    constructor(private databaseService: DatabaseService,
        private propertyService: PropertyService
    ) { }

    async create(data: CreateReservationDto) {
        const property = await this.propertyService.findOrFailById(data.propertyId);
        const day1 = dayjs(data.startDate);
        const day2 = dayjs(data.endDate);

        if (DateUtils.isDateAfter(data.startDate, data.endDate)) {
            throw new BadRequestException('Start date is after end date');
        }
        const totalDays = DateUtils.getTotalDays(day1.toISOString(), day2.toISOString());
        const totalPrice = totalDays * property.price;
        return this.databaseService.reservation.create({
            data: {
                propertyId: data.propertyId,
                startDate: data.startDate,
                endDate: data.endDate,
                totalPrice: totalPrice,
                userId: data.userId,
            }
        });
    }
    async findAllByPropertyId(propertyId: string) {
        return this.databaseService.reservation.findMany({
            where: { propertyId: propertyId },
        });
    }

    async updateByReservationId(reservationId: string, data: UpdateReservationDto) {
        const reservation = await this.databaseService.reservation.findUnique({
            where: { id: reservationId },
        });
        const property = await this.propertyService.findOrFailById(reservation.propertyId);
        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }
        const currentDate = dayjs();
        const startDate = dayjs(data.startDate);
        const endDate = dayjs(data.endDate);

        if (DateUtils.isDateAfter(currentDate.toISOString(), endDate.toISOString())) {
            throw new BadRequestException('Current date is after end date');
        }
        const totalDays = DateUtils.getTotalDays(startDate.toISOString(), endDate.toISOString());
        const totalPrice = totalDays * property.price;
        return this.databaseService.reservation.update({
            where: { id: reservationId },
            data: {
                ...data,
                totalPrice: totalPrice,
            },
        });
    }
    async deleteByReservationId(reservationId: string) {
        const reservation = await this.databaseService.reservation.findUnique({
            where: { id: reservationId },
        });
        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }
        const currentDate = dayjs();
        const endDate = dayjs(reservation.endDate);
        if (DateUtils.isDateAfter(currentDate.toISOString(), endDate.toISOString())) {
            throw new BadRequestException('Current date is after end date');
        }
        return this.databaseService.reservation.delete({
            where: { id: reservationId },
        });

    }
}