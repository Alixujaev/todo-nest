import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(200)
  @Get('/todos')
  getHello() {
    return this.appService.getAll();
  }

  @HttpCode(201)
  @Post('/create')
  create(@Body() dto: AppDto) {
    return this.appService.create(dto)
  }

  @HttpCode(200)
  @Delete('/todo/:id')
  delete(@Param('id') id: string){
    return this.appService.delete(id)
  }

  @HttpCode(200)
  @Put('/todo/:id')
  update(@Param('id') id: string, @Body() dto: AppDto){
    return this.appService.update(id, dto)
  }
}
