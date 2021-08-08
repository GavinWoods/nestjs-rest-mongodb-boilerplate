import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class MongoIdParamDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  id: string;
}
