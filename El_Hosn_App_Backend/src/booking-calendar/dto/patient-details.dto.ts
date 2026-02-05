import { IsString, IsOptional, IsEnum, IsNumber, IsNotEmpty } from 'class-validator';

export class PatientDetailsDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsOptional()
    middleName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsNotEmpty()
    mobile: string;

    @IsString()
    @IsOptional()
    nationalId?: string;

    @IsString()
    @IsOptional()
    dob?: string; // Format: YYYY-MM-DD

    @IsEnum(['Male', 'Female', 'male', 'female'])
    @IsOptional()
    gender?: 'Male' | 'Female' | 'male' | 'female';

    @IsOptional()
    age?: number | string;

    @IsString()
    @IsOptional()
    additionalPhone?: string;
}
