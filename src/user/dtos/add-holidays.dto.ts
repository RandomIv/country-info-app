import {
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddHolidaysDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  holidays: string[];
}
