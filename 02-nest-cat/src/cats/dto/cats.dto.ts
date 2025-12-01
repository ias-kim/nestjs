
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
    @ApiProperty({
        example: '43801199',
        description: 'id',
        required: true,
    })
    id: string;
}