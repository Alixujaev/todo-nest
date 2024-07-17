import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserType = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)