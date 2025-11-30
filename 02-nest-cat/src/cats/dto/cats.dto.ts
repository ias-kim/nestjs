
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
    @ApiProperty({
        example: 'hellcom',
        description: 'id',
        required: true,
    })
    id: string;
}