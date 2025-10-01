import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { StartsWith } from '../../decorators/starts-with.decorator';

export enum TaskTag {
  WORK = 'work',
  PERSONAL = 'personal',
  URGENT = 'urgent',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @StartsWith('Task:')
  @Length(2, 40)
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt({ message: 'Priority must be a number' })
  @IsOptional()
  @IsPositive()
  priority: number;

  @IsArray({ message: 'Tags must be an array' })
  @IsEnum(TaskTag, { message: 'Tags must be valid', each: true })
  @IsOptional()
  tags: TaskTag[];

  // @IsString()
  // @MinLength(6)
  // @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, { message: 'Password too weak' })
  // password: string;
  //
  // @IsUrl(
  //   {
  //     protocols: ['https', 'wss'],
  //     require_valid_protocol: true,
  //     host_blacklist: ['mail.ru'],
  //   },
  //   { message: 'Invalid URL' },
  // )
  // websiteUrl: string;
  //
  // @IsUUID('4', { message: 'userId must be a valid UUID v4' })
  // userId: string;
}
