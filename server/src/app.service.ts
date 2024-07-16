import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppType } from './app.schema';
import { AppDto } from './dto/app.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel('App') private appModel: Model<AppType>) {}
  async getAll() {
    return await this.appModel.find({})
  }

  async create(dto: AppDto){
    return await this.appModel.create(dto)
  }

  async delete(id: string){
    return await this.appModel.deleteOne({_id: id})
  }

  async update(id: string, dto: AppDto){
    return await this.appModel.updateOne({_id: id}, dto)
  }
}
