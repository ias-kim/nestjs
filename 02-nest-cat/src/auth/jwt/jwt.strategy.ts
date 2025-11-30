import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "./jwt.payload";
import { CatsRepository } from "src/cats/cats.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly catsRepositoy: CatsRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에 추출
            secretOrKey: 'secretKey', // 임시 키
            ignoreExpiration: false,  // 만료기간 
        });
    }

    // 페이로드 유효성 검증
    async validate(payload: Payload) {
        const cat = await this.catsRepositoy.findCatByIdWithoutPassword(
            payload.sub,
        );

        if (cat) {
            return cat; // request.user
        } else {
            throw new UnauthorizedException('접그 오류');
        }
    }
}