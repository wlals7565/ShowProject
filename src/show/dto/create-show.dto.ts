import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateShowDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly explain: string;

  @IsNotEmpty()
  startTime: Date;

  @IsNotEmpty()
  endTime: Date;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(50)
  @Max(100)
  readonly seat: number;

  @IsNotEmpty()
  @IsString()
  readonly img_url: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(10000)
  @Max(50000)
  readonly price: number;
}
