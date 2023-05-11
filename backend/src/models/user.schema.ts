import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongodb";

@Schema({ timestamps: true, id: true })
export class User {
	@Prop({ required: true })
	firstName: string;

	@Prop({ required: true })
	lastName: string;

	@Prop({ required: true, unique: true, lowercase: true })
	email: string;

	@Prop({ required: true })
	password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
