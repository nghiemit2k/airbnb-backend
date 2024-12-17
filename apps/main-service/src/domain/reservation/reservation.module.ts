import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { PropertyModule } from "../property/property.module";
import { PropertyService } from "../property/property.service";
@Module({
    imports: [PropertyModule],
    controllers: [ReservationController],
    providers: [ReservationService],

})
export class ReservationModule { }