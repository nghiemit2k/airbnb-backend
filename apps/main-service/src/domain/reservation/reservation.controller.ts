import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { User } from "@prisma/client";
import { UserReq } from "../../common/decorator/user.decorator";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
@Controller('/reservations')
export class ReservationController {
    constructor(private reservationService: ReservationService) { }

    @Post()
    create(@UserReq() user: User, @Body() data: CreateReservationDto) {
        data.userId = user.id;
        return this.reservationService.create(data);
    }

    @Get()
    findAllByPropertyId(@Query('propertyId') propertyId: string) {
        return this.reservationService.findAllByPropertyId(propertyId);
    }

    @Patch(':reservationId')
    updateByReservationId(@Param('reservationId') reservationId: string, @Body() data: UpdateReservationDto) {
        // TODO:validation: currentDate > endDate
        return this.reservationService.updateByReservationId(reservationId, data);
    }

    @Delete(':reservationId')
    deleteByReservationId(@Param('reservationId') reservationId: string) {
        return this.reservationService.deleteByReservationId(reservationId);
    }
}