import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';

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
    phone_country_code?: string;

    @IsString()
    @IsOptional()
    additionalPhone?: string;

    @IsString()
    @IsOptional()
    additional_phone_country_code?: string;

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

    @IsEnum(['iqama', 'national_id', 'passport'])
    @IsOptional()
    idType?: 'iqama' | 'national_id' | 'passport';

    @IsOptional()
    nationalityId?: number | string;
}
