import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSchema } from './app.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://islomali3110:YWQ9rSIFOgufx7jt@cluster0.sjxamya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), MongooseModule.forFeature([{ name: 'App', schema: AppSchema }])], 
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
