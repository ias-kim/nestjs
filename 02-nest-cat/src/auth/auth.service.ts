import { CatsRepository } from '../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private readonly CatsRepository: CatsRepository,
        private jwtService: JwtService,
    ) {}

    async jwtLogin(data: LoginRequestDto) {
        const {email, password} = data;

        // 이메일 확인
        const cat = await this.CatsRepository.findCatByEmail(email);

        if (!cat) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }

        // password가 일치한지
        const isPAsswordValidated: boolean = await bcrypt.compare(
            password,
            cat.password
        );

        if (!isPAsswordValidated) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
        }
        
        const payload = { email: email, sub: cat.id };

        return {
            token: this.jwtService.sign(payload),
        }
        
    }
}