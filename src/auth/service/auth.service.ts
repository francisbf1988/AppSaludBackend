/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        public userRepository: Repository<User>,
        public jwtService: JwtService,
    ) { }

    async register(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
        await this.userRepository.save(user);

        const payload = { id: user.id, phoneNumber: user.phoneNumber };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }

    async validateUser(phoneNumber: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { phoneNumber } });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }

    async disableAccount(userId: number): Promise<void> {
        await this.userRepository.update(userId, { isActive: false });
    }

    // Método para inactivar la cuenta del usuario
    async deactivateAccount(userId: number): Promise<void> {
        await this.userRepository.update(userId, { isActive: false });
    }
}
