import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "src/controllers/user.controller";
import { UserService } from "src/services/user.service";
import { User, UserSchema } from "src/models/user.schema";
import { JwtService } from "@nestjs/jwt";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.collection.name, schema: UserSchema },
		]),
	],
	controllers: [UserController],
	providers: [UserService, JwtService],
})
export class UserModule {}
