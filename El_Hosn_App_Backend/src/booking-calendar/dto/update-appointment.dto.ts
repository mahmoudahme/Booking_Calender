import { IsNumber, IsString, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PatientDetailsDto } from './patient-details.dto';

export class UpdateAppointmentDto {
    @IsNumber()
    @IsOptional()
    doctorId?: number;

    @IsString()
    @IsOptional()
    patientName?: string;

    @IsNumber()
    @IsOptional()
    patientId?: number;

    @IsString()
    @IsOptional()
    date?: string; // Format: YYYY-MM-DD

    @IsString()
    @IsOptional()
    time?: string; // Format: HH:MM

    @IsNumber()
    @IsOptional()
    duration?: number; // in minutes

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
