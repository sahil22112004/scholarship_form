import { IsString, IsEmail, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateApplicantDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'first_name must be a string' })
  @IsNotEmpty()
  first_name: string;

  @IsString({ message: 'last_name must be a string' })
  @IsNotEmpty()
  last_name: string;

  @IsString({ message: 'headquater_abbreviation must be a string' })
  @IsNotEmpty()
  headquater_abbreviation: string;

  @IsNumber()
  @IsNotEmpty()
  legacy_office_id: number;
}
