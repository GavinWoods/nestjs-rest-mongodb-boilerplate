import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class FindAllQueryDto {
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Transform((query) => Number(query && query.value))
  limit?: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Transform((query) => Number(query && query.value))
  page?: number;

  @IsOptional()
  @IsString()
  @Transform((query) => query?.value?.split(',')?.join(' ') || '')
  sort?: string;

  @IsOptional()
  @IsString()
  @Transform((query) => query?.value?.split(',')?.join(' ') || '')
  select?: string;

  @IsOptional()
  @IsString()
  @Transform((query) => query?.value?.split(',')?.join(' ') || '')
  include?: string;
}
