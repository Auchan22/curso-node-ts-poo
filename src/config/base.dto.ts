import { IsDate, IsOptional } from 'class-validator';

export class BaseDTO {
  @IsOptional()
  id!: string;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
