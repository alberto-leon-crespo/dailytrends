import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFeedDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}
