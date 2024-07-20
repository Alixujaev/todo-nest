import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserType } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private readonly saltRounds = 10; 
  private readonly jwtSecret = process.env.JWT_SECRET || 'default_secret';

  constructor(@InjectModel('User') private userModel: Model<UserType>) {}

  async register(dto: UserDto) {
    const { email, password } = dto;
    
    const isExist = await this.userModel.findOne({ email });
    
    if (isExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    
    const newUser = new this.userModel({ email, password: hashedPassword });
    await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, this.jwtSecret, { expiresIn: '30d' });
    
    return { user: newUser, token };
  }

  async login(dto: UserDto) {
    const { email, password } = dto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    }

    const token = jwt.sign({ id: user._id }, this.jwtSecret, { expiresIn: '30d' });

    return { user, token };
  }
}
