import { IsIn, IsString, MinLength } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @MinLength(5)
  address: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsIn(['low', 'medium', 'high'])
  severity: string;

  @IsString()
  reporterPhone: string;
}
