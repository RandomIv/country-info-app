import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';
import { Prisma } from '@prisma/client';
import { AddHolidaysDto } from './dtos/add-holidays.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
  }

  async addHolidaysToUser(userId: string, addHolidaysDto: AddHolidaysDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');

    const { data: publicHolidays } = await firstValueFrom(
      this.httpService.get(
        `https://date.nager.at/api/v3/PublicHolidays/${addHolidaysDto.year}/${addHolidaysDto.countryCode}`,
      ),
    );

    const holidaysToAdd = addHolidaysDto.holidays
      ? publicHolidays.filter((h) => addHolidaysDto.holidays.includes(h.name))
      : publicHolidays;

    await this.prisma.holiday.createMany({
      data: holidaysToAdd.map((holiday) => ({
        name: holiday.name,
        date: new Date(holiday.date),
        countryCode: holiday.countryCode,
        userId: userId,
      })),
      skipDuplicates: true,
    });

    return 'Holiday added successfully.';
  }

  async getUserHolidays(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        holidays: true,
      },
    });
  }
}
