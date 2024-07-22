/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: { phoneNumber: string; password: string }) {
        const user = await this.authService.validateUser(loginDto.phoneNumber, loginDto.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const payload = { id: user.id, phoneNumber: user.phoneNumber };
        const accessToken = this.authService.jwtService.sign(payload);
        return { accessToken };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Req() request) {
        // Implementa la lógica para cerrar sesión
    }

    @Post('disable')
    @UseGuards(JwtAuthGuard)
    async disableAccount(@Req() request) {
        await this.authService.disableAccount(request.user.id);
    }

    @Post('deactivate')
    @UseGuards(JwtAuthGuard)
    async deactivateAccount(@Req() request) {
        await this.authService.deactivateAccount(request.user.id);
        return { message: 'Cuenta inactivada correctamente' };
    }
}
