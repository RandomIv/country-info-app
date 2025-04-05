import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AddHolidaysDto } from './dtos/add-holidays.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post(':userId/holidays')
  addHolidays(
    @Param('userId') userId: string,
    @Body() addHolidaysDto: AddHolidaysDto,
  ) {
    return this.usersService.addHolidaysToUser(userId, addHolidaysDto);
  }

  @Get(':userId/holidays')
  getUserHolidays(@Param('userId') userId: string) {
    return this.usersService.getUserHolidays(userId);
  }
}
