import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppType } from './app.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel('App') private appModel: Model<AppType>) {}
  async getAll() {
    return await this.appModel.find({})
  }

  async create(){
    return await this.appModel.create({
      title: 'hello',
      
    })
  }
}
