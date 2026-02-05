import { IsNumber, IsString, IsOptional, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PatientDetailsDto } from './patient-details.dto';

export class CreateAppointmentDto {
    @IsNumber()
    @IsNotEmpty()
    doctorId: number;

    @IsString()
    @IsNotEmpty()
    patientName: string;

    @IsNumber()
    @IsOptional()
    patientId?: number;

    @IsString()
    @IsNotEmpty()
    date: string; // Format: YYYY-MM-DD

    @IsString()
    @IsNotEmpty()
    time: string; // Format: HH:MM

    @IsNumber()
    @IsNotEmpty()
    duration: number; // in minutes

    @IsString()
    @IsOptional()
    notes?: string;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    slotIds?: number[];

    @ValidateNested()
    @Type(() => PatientDetailsDto)
    @IsOptional()
    patientDetails?: PatientDetailsDto;
}
