import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FindOneQueryDto {
  @IsOptional()
  @IsString()
  @Transform((query) => query?.value?.split(',')?.join(' ') || '')
  include?: string;
}
