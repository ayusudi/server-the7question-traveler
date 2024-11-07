import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InputBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalDays: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  month: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  statusSouvenirs: boolean;
}
