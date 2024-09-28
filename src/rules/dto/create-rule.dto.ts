import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { RuleType } from '@prisma/client';

export class CreateRuleDto {
  @IsEnum(RuleType)
  ruleType: RuleType;

  @IsNumber()
  value: number;

  @IsString()
  @IsOptional()
  description?: string;
}
