import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { secret } from "./utils/constants";
import { UserModule } from "./modules/user.module";

import * as dotenv from "dotenv";
import { DietPlanModule } from "./modules/diet-plan.module";
dotenv.config();

@Module({
	imports: [
		MongooseModule.forRoot(process.env.MONGO_DB_URI),
		JwtModule.register({
			secret,
			signOptions: { expiresIn: "2h" },
		}),
		UserModule,
		DietPlanModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
