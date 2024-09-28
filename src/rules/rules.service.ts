import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';

@Injectable()
export class RulesService {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient) {}
  create(createRuleDto: CreateRuleDto) {
    return this.prisma.rule.create({ data: createRuleDto });
  }

  findAll() {
    return this.prisma.rule.findMany();
  }

  findOne(id: number) {
    return this.prisma.rule.findUnique({ where: { id } });
  }

  update(id: number, updateRuleDto: UpdateRuleDto) {
    return this.prisma.rule.update({ where: { id }, data: updateRuleDto });
  }

  remove(id: number) {
    return this.prisma.rule.delete({ where: { id } });
  }
}
