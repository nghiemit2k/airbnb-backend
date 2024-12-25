import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";
import { Module } from "@nestjs/common";
import { PropertyModule } from "../property/property.module";
import { StripeModule } from "../stripe/stripe.module";
@Module({
    imports: [PropertyModule, StripeModule],
    controllers: [ReservationController],
    providers: [ReservationService],

})
export class ReservationModule { }