import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { User } from "@prisma/client";
import { UserReq } from "../../common/decorator/user.decorator";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { StripeService } from "../stripe/stripe.service";
@Controller('/reservations')
export class ReservationController {
    constructor(private reservationService: ReservationService,
        private stripeService: StripeService,
    ) { }

    @Post()
    async create(@UserReq() user: User, @Body() data: CreateReservationDto) {
        data.userId = user.id;
        const reservation = await this.reservationService.create(data);
        const amount = reservation.totalPrice * 100; // sent
        const session = await this.stripeService.createCheckoutSession(amount);
        return {
            reservation,
            session,
        };
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