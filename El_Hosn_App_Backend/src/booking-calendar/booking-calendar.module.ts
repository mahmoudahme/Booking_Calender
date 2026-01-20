import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingCalendarController } from './booking-calendar.controller';
import { BookingCalendarService } from './booking-calendar.service';
import { DoctorModel } from '../entities/entities/DoctorModel.entity';
import { OpdRegistrationModel } from '../entities/entities/OpdRegistrationModel.entity';
import { ResPartner } from '../entities/entities/ResPartner.entity';
import { DoctorSpecialityModel } from '../entities/entities/DoctorSpecialityModel.entity';
import { PatientModel } from '../entities/entities/PatientModel.entity';
import { SubtimeModel } from '../entities/entities/SubtimeModel.entity';
import { ResCountry } from '../entities/entities/ResCountry.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DoctorModel,
            OpdRegistrationModel,
            ResPartner,
            DoctorSpecialityModel,
            PatientModel,
            SubtimeModel,
            ResCountry,
        ]),
    ],
    controllers: [BookingCalendarController],
    providers: [BookingCalendarService],
})
export class BookingCalendarModule { }
