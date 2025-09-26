import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString( { message: 'Title is not a string!!!!' } )
  @IsNotEmpty({ message: 'field is empty!!!' })
  @Length(2, 40,{ message: 'from 2 to 40 characters!!!' })
  title: string;

  @IsBoolean({ message: 'isCompleted is not a boolean!!!' })
  isCompleted: boolean;
}