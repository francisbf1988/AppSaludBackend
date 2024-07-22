/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsString()
    @IsNotEmpty()
    organization: string;

    @IsString()
    @IsNotEmpty()
    licenseNumber: string;

    @IsOptional()
    @IsString()
    medicalCertifications?: string;

    @IsOptional()
    @IsString()
    cv?: string;
}
