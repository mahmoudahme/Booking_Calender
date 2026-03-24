import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AccountMove } from '../entities/entities/AccountMove.entity';
import { AccountMoveLine } from '../entities/entities/AccountMoveLine.entity';
import { AccountPayment } from '../entities/entities/AccountPayment.entity';
import { ResCompany } from '../entities/entities/ResCompany.entity';
import { ProductProduct } from '../entities/entities/ProductProduct.entity';
import { ProductTemplate } from '../entities/entities/ProductTemplate.entity';
import { ProductCategory } from '../entities/entities/ProductCategory.entity';
import { OpdRegistrationModel } from '../entities/entities/OpdRegistrationModel.entity';
import { DoctorModel } from '../entities/entities/DoctorModel.entity';
import { ResPartner } from '../entities/entities/ResPartner.entity';
import { DoctorSpecialityModel } from '../entities/entities/DoctorSpecialityModel.entity';
import { PatientModel } from '../entities/entities/PatientModel.entity';
import { SubtimeModel } from '../entities/entities/SubtimeModel.entity';
import { StockMove } from '../entities/entities/StockMove.entity';
import { UomUom } from '../entities/entities/UomUom.entity';
import { StockLocation } from '../entities/entities/StockLocation.entity';
import { StockQuant } from '../entities/entities/StockQuant.entity';
import { ResCountry } from '../entities/entities/ResCountry.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountMove,
            AccountMoveLine,
            AccountPayment,
            ResCompany,
            ProductProduct,
            ProductTemplate,
            ProductCategory,
            OpdRegistrationModel,
            DoctorModel,
            ResPartner,
            DoctorSpecialityModel,
            PatientModel,
            SubtimeModel,
            StockMove,
            UomUom,
            StockLocation,
            StockQuant,
            ResCountry,
        ]),
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule { }
