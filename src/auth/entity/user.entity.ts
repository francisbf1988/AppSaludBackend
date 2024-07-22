/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    phoneNumber: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    email?: string;

    @Column()
    organization: string;

    @Column()
    licenseNumber: string;

    @Column({ nullable: true })
    medicalCertifications?: string;

    @Column({ nullable: true })
    cv?: string;

    @Column({ default: true })
    isActive: boolean;
}
