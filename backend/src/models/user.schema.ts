// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// @Schema({ timestamps: true, id: true })
// export class User {
// 	@Prop()
// 	firstName: string;

// 	@Prop()
// 	lastName: string;

// 	@Prop()
// 	email: string;

// 	@Prop()
// 	password: string;

// 	@Prop()
// 	dietPlans: string[];
// }

// console.log(User.name, "HELLO#");

// export const UserSchema = SchemaFactory.createForClass(User);

// ------------------------------------

import mongoose, { Model, Schema } from "mongoose";
import { UserInterface } from "src/utils/interfaces";

export type UserModel = Model<UserInterface>;

export const UserSchema = new Schema<UserInterface, UserModel>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		dietPlans: { type: [mongoose.Types.ObjectId], ref: "DietPlan" },
	},
	{
		timestamps: true,
		id: true,
	},
);

export const User = mongoose.model<UserInterface, UserModel>(
	"User",
	UserSchema,
);
