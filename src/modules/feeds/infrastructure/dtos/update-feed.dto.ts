import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateFeedDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}
