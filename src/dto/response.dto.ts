import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class Response {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  visaItinerary: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  safetyRedDistrict: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  weatherClothing: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  souvenirsOrFood: string;

  @ApiPropertyOptional({
    isArray: true,
    type: String,
  })
  @IsArray()
  relatedLink: string[];
}
