import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AppType = HydratedDocument<CreateTodoPayload>

@Schema()
export class CreateTodoPayload {
  @Prop({required: true})
  title: string;
  @Prop({required: true})
  completed: boolean;
}


export const AppSchema = SchemaFactory.createForClass(CreateTodoPayload);
