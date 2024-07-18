import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { UserType } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { UserDto } from "./dto/user.dto";

@Injectable()

export class UserService {
  constructor(@InjectModel('user') private userModel: Model<UserType>){}

  async register(dto: UserDto){
    const {email, password} = dto
    const isExist = await this.userModel.findOne({email})

    if(isExist){
      throw new Error('User already exist')
    }

    const newUser = new this.userModel({email, password})
    
    return await newUser.save()
  }
}